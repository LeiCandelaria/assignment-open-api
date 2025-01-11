import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as pdfParse from 'pdf-parse';
import { Multer } from 'multer';


@Controller('extract-image')
export class OcrController {
  @Post('pdf')
  @UseInterceptors(FileInterceptor('file', {
    storage: Multer({
      destination: './uploads',  // Specify where to save the uploaded files
      filename: (req, file, callback) => {
        // Provide a unique name for the uploaded file
        const uniqueName = `${Date.now()}-${file.originalname}`;
        callback(null, uniqueName);
      }
    })
  }))
  async extractFromPdf(@UploadedFile() file: Multer.File): Promise<{message: string; content:any;}> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    if (file.mimetype !== 'application/pdf') {
      throw new BadRequestException('Invalid file type. Only PDFs are allowed.');
    }

    try {
      const fileBuffer = fs.readFileSync(file.path);
      const pdfData = await pdfParse(fileBuffer);

      // Clean up the uploaded file after processing
      fs.unlinkSync(file.path);

      return {
        message: 'PDF content extracted successfully',
        content: pdfData.text, // The text content of the PDF
      };
    } catch (error) {
      throw new BadRequestException('Failed to process the PDF file');
    }
  }
}
