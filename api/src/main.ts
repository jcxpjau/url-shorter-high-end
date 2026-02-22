import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './interfaces/http/filters/http-exception.filter';
import { requestIdMiddleware } from './interfaces/http/middlewares/request-id.middleware';
import { logger } from './shared/logger/pino.logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(logger as any);
  app.use(requestIdMiddleware);
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();