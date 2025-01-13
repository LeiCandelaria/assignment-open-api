import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

// Read your image file
const imagePath = 'src/ocr/to/french.jpg';
const image = fs.readFileSync(imagePath);

// Create a FormData instance and append the image
const formData = new FormData();
formData.append('file', image, 'french.jpg');

// Set your OCR.space API key
const apiKey = 'K82599337288957';

// Configure the request
const config = {
    headers: {
        ...formData.getHeaders(),
        'apikey': apiKey,
    },
    params: {
        language: 'fre', // Setting language to french//
    },
};

// Send the image to the OCR API
axios.post('https://api.ocr.space/parse/image', formData, config)
    .then(response => {
        // Print the entire response for debugging
        console.log('Full Response:', JSON.stringify(response.data, null, 2));
        
        // Extract and print the detected language if available
        const originalResults = response.data.ParsedResults[0];
        const filteredResults = {
            ParsedText: originalResults.ParsedText,
            Language: originalResults.Language || "Language not detected"
        };
        console.log('Parsed Results:', filteredResults);
    })
    .catch(error => {
        console.error('Error:', error);
    });
