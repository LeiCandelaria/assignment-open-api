import { Module,MiddlewareConsumer } from '@nestjs/common';
import { OcrController } from './ocr/ocr.controller';
import { AuthMiddleware } from './auth/auth.middleware';
import { OcrModule } from './ocr/ocr.module';

@Module({
  imports: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*'); //Applying the middleware to all routes//
  }
}