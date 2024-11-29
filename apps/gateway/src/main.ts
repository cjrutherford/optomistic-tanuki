/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { addAbortSignal } from 'stream';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Optomisitc Tanuki API')
    .setDescription('I got caught by an angry panda once, he said life\'s too short to be stuck working for someone else\'s dreams. I wonder if he ever got back home.')
    .setVersion('1.0')
    .addTag('authentication')
    .addTag('social')
    .addTag('timeline')
    .addTag('post')
    .addTag('timer')
    .addTag('attachment')
    .addTag('comment')
    .addTag('vote')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
  Logger.log(`📚 Swagger is running on: http://localhost:${port}/api-docs`);
}

bootstrap();
