import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ISDEVELOPMENT } from './config/options.config';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.setGlobalPrefix('v1',{ exclude: ['xxx'] }); // exclude must be fullpath
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  if (ISDEVELOPMENT) {
    const config = new DocumentBuilder()
      .setTitle('this is a title')
      .setDescription('this is a description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('doc', app, document);
  }

  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/files',
  });

  await app.listen(3000);
}
bootstrap();
