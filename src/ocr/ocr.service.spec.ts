import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OcrService {
  private readonly apiUrl: string;
  private readonly apiKey: string;
  private readonly apiHost: string;

  constructor(private configService: ConfigService) {
    this.apiUrl = this.configService.get('https://ocrwizard.p.rapidapi.com');
    this.apiKey = this.configService.get('a956635aa5msh64d519eeb5cd21bp1876dcjsn35c507c13e28');
    this.apiHost = this.configService.get('ocr-wizard.p.rapidapi.comT');
  }

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
