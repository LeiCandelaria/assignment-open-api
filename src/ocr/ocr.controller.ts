import { Controller, Post, Body, HttpException, HttpStatus,Get,Query } from '@nestjs/common';
import { OcrService } from './ocr.service';

@Controller('ocr')
export class OcrController {
  constructor(private readonly ocrService: OcrService) {}

  @Get('image')
  async extractTextFromImage(@Query('url') url: string) {
    try {
      const data = await this.ocrService.extractTextsFromImage(url);
      return data;
    } catch (error) {
      throw new Error(`Failed to extract text from image: ${error.message}`);
    }
  }

  @Get('pdf')
  async extractTextFromPdf(@Query('path') path: string) {
    try {
      const data = await this.ocrService.extractTextsFromPdf(path);
      return data;
    } catch (error) {
      throw new Error(`Failed to extract text from PDF: ${error.message}`);
    }
  }
}