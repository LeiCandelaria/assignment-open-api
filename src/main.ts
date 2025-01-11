import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const uploadDir = path.join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS for cross-origin requests
  await app.listen(8989);
}
bootstrap();
