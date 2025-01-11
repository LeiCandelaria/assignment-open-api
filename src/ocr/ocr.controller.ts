import { Controller, Post, UploadedFile, UseInterceptors,Body} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OcrService } from './ocr.service';
import {Multer} from 'multer'



@Controller('parse/image')
export class OcrController {
  constructor(private readonly ocrService: OcrService) {}

  @Post('img')
  async extractFromImage(@Body('imageUrl') imageUrl: string) {
    return await this.ocrService.extractTextFromImage(imageUrl);
  }
  
  @Post('pdf')
  @UseInterceptors(FileInterceptor('file'))
  async extractFromPdf(@UploadedFile() file:Multer.File) {
    return await this.ocrService.extractTextFromPdf(file.path);
  }
}

