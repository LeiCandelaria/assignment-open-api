import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as FormData from 'form-data';
import axios from 'axios';
import { pdf2text } from 'pdf2text';  // Ensure you have installed the necessary pdf2text package

@Injectable()
export class OcrService {
  extractTextFromPdf({ pdfPath }: { pdfPath: string; }) {
    throw new Error('Method not implemented.');
  }
  private readonly apiUrl = 'https://api.ocr.space/parse/image';
  private readonly apiKey = process.env.api; // Use environment variables for security

  // Extract text from a single image URL
  async extractTextFromImage(imageUrl: string): Promise<any> {
    const formData = new FormData();
    formData.append('url', imageUrl);
    try {
      const response = await this.makeRequest(formData);
      return response;
    } catch (error) {
      throw new HttpException(
        `Failed to process OCR request for image: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Extract text from a PDF file (assuming file paths are given)
  async extractTextsFromPdf(filePaths: string[]): Promise<string[]> {
    const promises = filePaths.map((filePath) => this.extractTextFromPdfFile(filePath));
    return await Promise.all(promises); // Run all promises concurrently
  }

  // Private method to process the OCR request to the OCR API
  private async makeRequest(formData: FormData): Promise<any> {
    try {
      const response = await axios.post(this.apiUrl, formData, {
        headers: {
          ...formData.getHeaders(),
          apiKey: this.apiKey, // Ensure this is set correctly
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

  // Private method to extract text from a PDF file using pdf2text
  private async extractTextFromPdfFile(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      pdf2text(filePath, (err, text) => {
        if (err) {
          reject(`Failed to extract text from PDF: ${err.message}`);
        } else {
          resolve(text);
        }
      });
    });
  }

  // Extract text from multiple images
  async extractTextFromImages(imageUrls: string[]): Promise<any[]> {
    const promises = imageUrls.map((imageUrl) => this.extractTextFromImage(imageUrl));
    return await Promise.all(promises); // Run all promises concurrently
  }
}
