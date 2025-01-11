const express = require('express');
const multer = require('multer');
const axios = require('axios');
const tf = require('@tensorflow/tfjs-node');
const mobilenet = require('@tensorflow-models/mobilenet');
const fs = require('fs');
const path = require('path');

// Initialize Express app
const app = express();
const port = 9898;

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Load MobileNet model for image classification
let model;
mobilenet.load().then(loadedModel => {
  model = loadedModel;
  console.log('MobileNet model loaded');
});

// OCR Wizard API configuration
const OCR_API_URL = 'https://api.ocr.space/parse/image';
const API_KEY = 'K82599337288957'; // OCR SPACE API key

// GET route for image upload and processing
app.post('extractTextFromImage', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No image uploaded' });
  }

  const imagePath = path.join(__dirname, 'uploads', req.file.filename);
  const imageBuffer = fs.readFileSync(imagePath);

  try {
    // Step 1: OCR processing using OCR Wizard API
    const ocrResponse = await axios.post(OCR_API_URL, imageBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'X-RapidAPI-Host': 'ocr-wizard.p.rapidapi.com',
        'X-RapidAPI-Key': API_KEY
      }
    });

    const extractedText = ocrResponse.data.text || 'No text found in the image';

    // Step 2: Image classification using TensorFlow.js (MobileNet)
    const imageTensor = tf.node.decodeImage(imageBuffer);
    const predictions = await model.classify(imageTensor);

    // Step 3: Return combined result (OCR + Classification)
    res.json({
      extractedText,
      classification: predictions[0] // Return the top prediction
    });

    // Cleanup uploaded file
    fs.unlinkSync(imagePath);
  } catch (error) {
    res.status(500).send({ message: 'Error processing image', error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
