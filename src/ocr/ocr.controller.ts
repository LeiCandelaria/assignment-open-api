import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {Multer} from 'multer';
import * as fs from 'fs';
import { OcrService } from './ocr.service';

@Controller('ocr')
export class OcrController {
  constructor(private readonly ocrService: OcrService) {}

  @Post('extract-text')
  @UseInterceptors(
    FileInterceptor('file', {   
      storage: Multer.diskStorage({
        destination: './uploads', // Directory to save uploaded files//
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${file.originalname}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async handleFileUpload(@UploadedFile() file: Multer.File): Promise<{ text: string }> {
    if (!file) {
      throw new Error('No file uploaded');
    }

    try {
      const text = await this.ocrService.extractTextsFromPdf(file.path);
      return { text };
    } catch (error) {
      throw new Error(`OCR processing failed: ${error.message}`);
    } finally {
      fs.unlinkSync(file.path); // Clean up uploaded file
    }
  }
}
