import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OcrService {
  private readonly apiUrl: string;
  private readonly apiKey: string;
  private readonly apiHost: string;


  async extractTextFromImage(imageUrl: string): Promise<any> {
    try {
      const response = await axios.post(
        `${this.apiUrl}/extract`,
        { imageUrl },
        {
          headers: {
            'X-RapidAPI-Key': this.apiKey,
            'X-RapidAPI-Host': this.apiHost,
          },
        },
      );

      return response.data;
    } catch (error) {
      throw new Error(`Failed to extract text: ${error.message}`);
    }
  }

  async extractTextFromPdf(pdfUrl: string): Promise<any> {
    try {
      const response = await axios.post(
        `${this.apiUrl}/extract-pdf`,
        { pdfUrl },
        {
          headers: {
            'X-RapidAPI-Key': this.apiKey,
            'X-RapidAPI-Host': this.apiHost,
          },
        },
      );

      return response.data;
    } catch (error) {
      throw new Error(`Failed to extract text from PDF: ${error.message}`);
    }
  }
}
