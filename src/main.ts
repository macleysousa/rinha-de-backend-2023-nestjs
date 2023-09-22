import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { NextFunction } from 'express';

import { AppModule } from './app.module';
import { ValidationExceptionFactory } from './exceptions/validations.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: ValidationExceptionFactory,
    })
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.use((_req: Request, _res: Response, _next: NextFunction, error: Error) => {
    Logger.error(error, error.stack, 'App');
  });

  app.enableCors();

  Logger.log(`Server running on port ${process.env.PORT || 3000}`, 'Bootstrap');
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
