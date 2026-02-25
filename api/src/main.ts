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
    app.useGlobalFilters(new HttpExceptionFilter());

    const config = new DocumentBuilder()
        .setTitle('URL Shortener API')
        .setDescription('API para encurtar URLs')
        .setVersion('1.0')
        .addBearerAuth(
            {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
              name: 'JWT',
              description: 'Insira o token JWT',
              in: 'header',
            },
            'access-token',
          )
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);

    const port = process.env.PORT || 3000;
    await app.listen(port, '0.0.0.0');
    logger.log(`Server running on port ${port}`);
    logger.log(`Swagger running on ${port}/swagger`);
}

bootstrap();