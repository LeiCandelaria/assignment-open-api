import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OcrService } from './ocr/ocr.service';
import { OcrController } from './ocr/ocr.controller';

@Module({
  imports: [],
  controllers: [AppController, OcrController],
  providers: [AppService, OcrService],
})
export class AppModule {}
