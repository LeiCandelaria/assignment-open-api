import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { OcrService } from './ocr.service';

@Controller('ocr')
export class OcrController {
  constructor(private readonly ocrService: OcrService) {}

  @Post()
  async extractText(@Body('imageUrl') imageUrl: string) {
    try {
      const result = await this.ocrService.extractTextsFromImage(imageUrl);
      return { success: true, data: result };
    } catch (error) {
      throw new HttpException(
        { success: false, message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
