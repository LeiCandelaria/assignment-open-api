import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
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
  async extractTextsFromPdf(@Body('filePaths') filePaths: string[]): Promise<any> {
    try {
      const extractedTexts = await this.ocrService.extractTextsFromPdf(filePaths);
      return {
        success: true,
        data: extractedTexts, // Return extracted texts from the PDF files
      };
    } catch (error) {
      return {
        success: false,
        message: error.message, // Return error message if failure
      };
    }
  }

  // Endpoint for converting text to a PDF
  @Post('convert-text-to-pdf')
  async convertTextToPDF(@Body() body: { text: string; filename: string }): Promise<any> {
    const { text, filename } = body;
    if (!text || !filename) {
      throw new HttpException('Text and filename must be provided', HttpStatus.BAD_REQUEST);
    }
    try {
      await this.ocrService.convertTextToPDF(text, filename);
      return { message: 'PDF created successfully', filename };
    } catch (error) {
      throw new HttpException(
        `Failed to convert text to PDF: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
