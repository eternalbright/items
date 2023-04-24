import { NestFactory } from '@nestjs/core';

import { EntityModule } from './app/modules/entity/entity.module';

const {
  APP_HOSTNAME = '0.0.0.0',
  APP_PORT = 3000,
  APP_VERSION = 'v1', 
} = process.env;

async function bootstrap() {
  const app = await NestFactory.create(EntityModule);

  app.setGlobalPrefix(APP_VERSION);

  await app.listen(APP_PORT, APP_HOSTNAME, () => {
    // ...
  });
}

bootstrap();  
