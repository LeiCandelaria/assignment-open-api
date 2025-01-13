import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

// Read your image file
const imagePath = 'src/uploads/11s.png';
const image = fs.readFileSync(imagePath);

// Create a FormData instance and append the image
const formData = new FormData();
formData.append('file', image, '11s.png');

//OCR.space API key//
const apiKey = 'K82599337288957';

// Configure the request
const config = {
    headers: {
        ...formData.getHeaders(),
        'apikey': apiKey,
    },
    params: {
        language: 'auto', // Detect language automatically
    },
};

// Send the image to the OCR API
axios.post('https://api.ocr.space/parse/image', formData, config)
    .then(response => {
        // Print the detected language
        const detectedLanguage = response.data.ParsedResults[0].Language;
        console.log('Detected Language:', detectedLanguage);
    })
    .catch(error => {
        console.error('Error:', error);
    });
