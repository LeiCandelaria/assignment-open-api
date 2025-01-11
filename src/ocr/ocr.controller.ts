import { Controller, Post, Body } from '@nestjs/common';
import { OcrService } from './ocr.service';
import{ Multer} from 'multer'
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
  async extractFromPdf(@Body('pdfPath') pdfPath: string) {
    try {
      const extractedText = await this.ocrService.extractTextFromPdf(pdfPath);
      return {
        success: true,
        data: extractedText,  // Return extracted text from the PDF
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,  // Return error message if failure
      };
    }
  }
}


function extractFromPdf(arg0: any, file: any, File: any) {
  throw new Error('Function not implemented.');
}
