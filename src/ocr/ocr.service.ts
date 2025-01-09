import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OcrService {
  private readonly apiUrl = 'https://ocr-wizard.p.rapidapi.com';
  private readonly apiKey = 'a956635aa5msh64d519eeb5cd21bp1876dcjsn35c507c13e28'; // the given API key//
  async processImage(imageUrl: string): Promise<any> {
    try {
      const response = await axios.post(
        `${this.apiUrl}/process`,
        { image_url: imageUrl },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Host': 'ocr-wizard.p.rapidapi.com',
            'X-RapidAPI-Key': this.apiKey,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error processing image: ${error.message}`);
    }
  }
}
