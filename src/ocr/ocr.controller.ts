import { Controller, Post, Body } from '@nestjs/common';
import { OcrService } from './ocr.service';

@Controller('ocr')
export class OcrController {
  constructor(private readonly ocrService: OcrService) {}

  @Post('process')
  async processImage(@Body('imageUrl') imageUrl: string) {
    if (!imageUrl) {
      throw new Error('Image URL is required.');
    }
    return await this.ocrService.processImage(imageUrl);
  }
}
