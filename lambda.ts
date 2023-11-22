import * as serverless from 'serverless-http';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';

let cachedServer: any;

async function bootstrap() {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule);
    await app.init();
    cachedServer = serverless(app.getHttpAdapter().getInstance());
  }
  return cachedServer;
}

export const handler = async (event: any, context: any) => {
  const server = await bootstrap();
  return server(event, context);
};
