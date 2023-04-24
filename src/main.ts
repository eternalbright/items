import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { ItemModule } from './app/modules/item/item.module';

const {
  APP_HOSTNAME = '0.0.0.0',
  APP_PORT = 3000,
  APP_VERSION = 'v1', 
} = process.env;

async function bootstrap() {
  const app = await NestFactory.create(
    ItemModule,
    new FastifyAdapter({ logger: true }),
  );

  app.setGlobalPrefix(APP_VERSION);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true }),
  );

  const config = new DocumentBuilder()
    .setTitle('Items')
    .setDescription('The Items API description')
    .setVersion('0.0.1')
    .addTag('items')
    .build();

  const document = SwaggerModule.createDocument(app, config, { ignoreGlobalPrefix: false });

  SwaggerModule.setup('reference', app, document);

  await app.listen(APP_PORT, APP_HOSTNAME);
}

bootstrap();
