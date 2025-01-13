const express = require('express');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const app = express();
const port = 3000;

// Endpoint to handle OCR requests
app.post('/ocr', async (req, res) => {
    try {
        // Read your image file
        const imagePath = 'src/ocr/to/french.jpg'; // Change to your image path
        const image = fs.readFileSync(imagePath);

        // Create a FormData instance and append the image
        const formData = new FormData();
        formData.append('file', image, 'french.jpg');

        // Set your OCR.space API key
        const apiKey = 'K82599337288957';

        // Configure the request to OCR.space API
        const config = {
            headers: {
                ...formData.getHeaders(),
                'apikey': apiKey,
            },
            params: {
                language: 'fre', // Set to a valid language code
            },
        };

        // Send the image to the OCR API
        const response = await axios.post('https://api.ocr.space/parse/image', formData, config);

        // Extract and print the detected language if available
        const originalResults = response.data.ParsedResults[0];
        const filteredResults = {
            ParsedText: originalResults.ParsedText,
            Language: originalResults.Language || "Language not detected",
        };

        res.json(filteredResults);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing the image.' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
