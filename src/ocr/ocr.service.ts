import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import * as FormData from 'form-data';
import axios from 'axios';

@Injectable()
export class OcrService {
  private readonly apiUrl = 'https://api.ocr.space/parse/image';
  private readonly apiKey = process.env.api; // Use environment variables for security

  private async makeRequest(formData: FormData): Promise<any> {
    try {
      const response = await axios.post(this.apiUrl, formData, {
        headers: {
          ...formData.getHeaders(),
          'X-RapidAPI-Host': 'ocr-wizard.p.rapidapi.com',
          'X-RapidAPI-Key': this.apiKey,
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

  async extractTextFromImage(imageUrl: string): Promise<any> {
    const formData = new FormData();
    formData.append('url', imageUrl);

    return await this.makeRequest(formData);
  }

  async extractTextFromPdf(pdfFilePath: string): Promise<any> {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(pdfFilePath));

    return await this.makeRequest(formData);
  }
}
