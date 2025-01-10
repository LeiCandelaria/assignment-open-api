import { Controller, Post, Body } from '@nestjs/common';
import { OcrService } from './ocr.service';

@Controller('ocr')
export class OcrController {
  constructor(private readonly ocrService: OcrService) {}

  @Post('extract')
  async extractTextFromImage(@Body('imageUrl') imageUrl: string) {
    if (!imageUrl) {
      throw new Error('Image URL is needed.');
    }
    return await this.ocrService.extractTextsFromImage(imageUrl);
  }
}
