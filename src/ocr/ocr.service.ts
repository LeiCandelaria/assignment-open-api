import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';

@Injectable()
export class OcrService {
  private readonly apiKey = ' K82599337288957'; // OCR.Space API key
  private readonly apiUrl = 'https://api.ocr.space/parse/image';

  async processImage(filePath: string): Promise<string> {
    try {
      const fileData = fs.createReadStream(filePath);

      const response = await axios.post(this.apiUrl, {
        file: fileData,
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'apikey': this.apiKey,
        },
      });

      const parsedText = response.data.ParsedResults[0].ParsedText;
      return parsedText || 'No text detected';
    } catch (error) {
      throw new HttpException(
        `OCR processing failed: ${error.response?.data?.ErrorMessage || error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
