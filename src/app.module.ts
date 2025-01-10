import { Module,MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OcrService } from './ocr/ocr.service';
import { OcrController } from './ocr/ocr.controller';
import { AuthMiddleware } from './auth/auth.middleware';
import { OcrModule } from './ocr/ocr.module';
import { OcrModule } from './ocr/ocr.module';
import { OcrModule } from './ocr/ocr.module';

@Module({
  imports: [AppModule, OcrModule],
  controllers: [AppController, OcrController],
  providers: [AppService, OcrService],
})
export class AppModule {
  configure(consumer:MiddlewareConsumer){
    consumer.apply(AuthMiddleware).forRoutes('ocr'); // Applying Middleware to ocr routes//
  }
}
