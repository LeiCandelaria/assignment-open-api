import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

// Read your image file
const imagePath = 'path/to/your_image.jpg';
const image = fs.readFileSync(imagePath);

// Create a FormData instance and append the image
const formData = new FormData();
formData.append('file', image, 'your_image.jpg');

// Set your OCR.space API key
const apiKey = 'your_api_key_here';

// Configure the request
const config = {
    headers: {
        ...formData.getHeaders(),
        'apikey': apiKey,
    },
    params: {
        language: 'auto', // Set to auto-detect language
    },
};

// Send the image to the OCR API
axios.post('https://api.ocr.space/parse/image', formData, config)
    .then(response => {
        const originalResults = response.data.ParsedResults[0];
        // Add the detected language to the parsed results
        const filteredResults = {
            ParsedText: originalResults.ParsedText,
            Language: originalResults.Language || "Language not detected"
        };
        // Include the language in the ParsedResults field
        response.data.ParsedResults[0] = filteredResults;
        console.log('Parsed Results:', response.data.ParsedResults);
    })
    .catch(error => {
        console.error('Error:', error);
    });
