import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export async function azureFunction(context, req) {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const result = await app.getHttpAdapter().getInstance().handleHttp({
    headers: req.headers,
    method: req.method,
    url: req.originalUrl,
    body: req.rawBody,
  });

  context.res = {
    status: result.getStatus(),
    body: result.getResponse(),
    headers: result.getHeaders(),
  };
}

