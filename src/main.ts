import { NestFactory } from '@nestjs/core';
import { ApiUrls } from 'shared/enums/api-urls.enum';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(ApiUrls.BASE);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
