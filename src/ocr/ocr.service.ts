import { Injectable } from '@nestjs/common';
import * as qs from 'querystring';
import * as https from 'https';

@Injectable()
export class OcrService {
  private readonly apiUrl = 'https://ocr-wizard.p.rapidapi.com';
  private readonly apiKey = 'a956635aa5msh64d519eeb5cd21bp1876dcjsn35c507c13e28';

  async extractTextsFromImage(imageUrl: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'POST',
        hostname: 'ocr-wizard.p.rapidapi.com',
        path: '/ocr',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Host': 'ocr-wizard.p.rapidapi.com',
          'X-RapidAPI-Key': this.apiKey,
        },
      };

      const req = https.request(options, (res) => {
        const chunks: Buffer[] = [];

        res.on('data', (chunk) => chunks.push(chunk));

        res.on('end', () => {
          try {
            const body = Buffer.concat(chunks).toString();
            resolve(JSON.parse(body)); 
          } catch (error) {
            reject(new Error(`Failed to parse OCR response: ${error.message}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(new Error(`Failed to make OCR request: ${error.message}`));
      });

      req.write(qs.stringify({ url: imageUrl }));
      req.end();
    });
  }
}
