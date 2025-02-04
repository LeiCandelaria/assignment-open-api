import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OcrModule } from './ocr/ocr.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes environment variables globally available//
    }),
    OcrModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
