import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      validationError: { target: false, value: false }
    })
  );

  const config = new DocumentBuilder().setTitle('getick').setDescription('getick API').setVersion('1.0').addTag('users').build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
// tslint:disable-next-line:no-floating-promises
bootstrap();
