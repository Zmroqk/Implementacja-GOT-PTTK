import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
   const app = await NestFactory.create(AppModule, { cors: true });
   app.useGlobalPipes(new ValidationPipe());

   const config = new DocumentBuilder()
      .setTitle('GOT PTTK')
      .setDescription('Api for GOT PTTK project')
      .setVersion('1')
      .build();
   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('swagger', app, document);

   await app.listen(3000);
}
bootstrap();
