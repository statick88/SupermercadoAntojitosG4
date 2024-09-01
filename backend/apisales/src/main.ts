import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Ignora propiedades no definidas en el DTO
    forbidNonWhitelisted: true, // Lanzar error si hay propiedades no definidas en el DTO
    transform: true, // Transforma la entrada a la clase especificada en el DTO
  }));
  app.enableCors(); 
  await app.listen(3002, '0.0.0.0');
}
bootstrap();
