import { Injectable } from '@nestjs/common';
import * as qs from 'querystring';
import * as https from 'https';

@Injectable()
export class OcrService {
  private readonly apiUrl = 'https://ocr-wizard.p.rapidapi.com';
  private readonly apiKey = 'c07ba95489mshf6b2ee4e8a15344p134b2cjsnf807b965533c';

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
