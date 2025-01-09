import { Controller, Post, Body } from '@nestjs/common';
import { OcrService } from './ocr.service';

@Controller('ocr')
export class OcrController {
  constructor(private readonly ocrService: OcrService) {}

  @Post('extract-text')
  async extractText(@Body('imageUrl') imageUrl: string) {
    return this.ocrService.extractTextFromImage(imageUrl);
  }

  @Post('extract-pdf')
  async extractPdf(@Body('pdfUrl') pdfUrl: string) {
    return this.ocrService.extractTextFromPdf(pdfUrl);
  }
}
