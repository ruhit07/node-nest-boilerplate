import { Logger, NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { json } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { AppModule } from './app.module';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';

export async function bootstrap(): Promise<NestExpressApplication> {
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();

  const logger = new Logger('Bootstrap Logger');

  const nestAppOptions: NestApplicationOptions = {
    logger,
  };

  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), nestAppOptions);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.setGlobalPrefix(`${AppModule.apiPrefix}`);
  app.use(json());
  app.use(helmet());
  app.use(cookieParser());
  app.use(compression());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: 'Too many requests from this IP, please try again later',
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      skipUndefinedProperties: true,
    }),
  );

  await app.listen(AppModule.port);

  logger.log(`Application listening on port ${AppModule.port} in ${AppModule.nodeEnv} mode.`);

  return app;
}

void bootstrap();
