import { Controller, Post, Body } from '@nestjs/common';
import { OcrService } from './ocr.service';
@Controller('extractTextFromImage') // The controller base route
export class OcrController {
  constructor(private readonly ocrService: OcrService) {}

  // Endpoint for extracting text from an image URL
  @Post('img')
  async extractFromImage(@Body('imageUrl') imageUrl: string) {
    try {
      const extractedText = await this.ocrService.extractTextFromImage(imageUrl);
      return {
        success: true,
        data: extractedText,  // Return extracted text from the image
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,  // Return error message if failure
      };
    }
  }

  // Endpoint for extracting text from a PDF file
  @Post('pdf')
  async extractTextsFromPdf(filePaths: string[]): Promise<string[]> {
    const promises = filePaths.map((filePath) => this.extractTextFromPdf(filePath));
    return await Promise.all(promises);
  }
  extractTextFromPdf(filePath: string): any {
    throw new Error('Method not implemented.');
  }
}