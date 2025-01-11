import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import * as FormData from 'form-data';
import axios from 'axios';
import {pdf2text} from 'pdf2text'


@Injectable()
export class OcrService {
  private readonly apiUrl = 'https://api.ocr.space/parse/image';
  private readonly apiKey = process.env.api; // Use environment variables for security

  private async makeRequest(formData: FormData): Promise<any> {
    try {
      const response = await axios.post(this.apiUrl, formData, {
        headers: {
          ...formData.getHeaders(),
          'apiUrl': 'https://api.ocr.space/parse/image',
          'apiKey': this.apiKey, // Ensure this is set correctly
        },
      });
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Failed to process OCR request: ${error.response?.data?.message || error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async extractTextFromImages(imageUrls: string[]): Promise<any[]> {
    const promises = imageUrls.map((imageUrl) => {
      const formData = new FormData();
      formData.append('url', imageUrl);
      return this.makeRequest(formData); // Create a promise for each image URL
    });
    return await Promise.all(promises);  // Run all promises concurrently
  }
  async extractTextFromPdfs(filePaths: string[]): Promise<string[]> {
    const promises = filePaths.map((filePath) => {
      return this.extractTextFromPdf(filePath);  // Create a promise for each PDF file
    });
    return await Promise.all(promises);  // Run all promises concurrently for pdf//
  }
  async extractTextFromPdf(pdfPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      pdf2text(pdfPath, (err, text) => {
        if (err) {
          reject(`Error extracting text from PDF: ${err.message}`);
        } else {
          resolve(text); // Return the extracted text
        }
      });
    });
  }
}

function pdf2text(pdfPath: string, arg1: (err: any, text: any) => void) {
  throw new Error('Function not implemented.');
}

