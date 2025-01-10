import { Injectable } from '@nestjs/common';
import * as qs from 'querystring';
import * as fs from 'fs';
import * as https from 'https';
import * as FormData from 'form-data';


@Injectable()
export class OcrService {
  private readonly apiUrl = 'https://ocr-wizard.p.rapidapi.com';
  private readonly apiKey = '3125b455b2mshebb4d7a29de0269p1f9f8djsndedb28c1bd0c';

  async extractTextsFromImage(imageUrl: string): Promise<any> { // extracting text from images//
    return new Promise((resolve, reject) => {
      const options = {
        method: 'POST',
        hostname: 'ocr-wizard.p.rapidapi.com',
        path: '/ocr',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
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
            resolve(JSON.parse(body)); // This allows us to
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
  
    async extractTextsFromPdf(pdfFilePath: string): Promise<any> {  // extracting text from PDF Files//
    return new Promise((resolve, reject) => {
      const form = new FormData();
      form.append('file', fs.createReadStream(pdfFilePath));

      const options = {
        method: 'POST',
        hostname: 'ocr-wizard.p.rapidapi.com',
        path: '/ocr',
        headers: {
          ...form.getHeaders(),
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

      form.pipe(req);
    });
  }
  
}
