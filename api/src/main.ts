import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './interfaces/http/filters/http-exception.filter';
import { requestIdMiddleware } from './interfaces/http/middlewares/request-id.middleware';
import { logger } from './shared/logger/pino.logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(logger);
  app.use(requestIdMiddleware);
  //app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('URL Shortener API')
    .setDescription('API para encurtar URLs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  logger.log('Server running on http://localhost:3000');
  logger.log('Swagger running on http://localhost:3000/api');
}

bootstrap();