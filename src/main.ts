import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'log', 'verbose', 'warn'],
  })

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  )

  await app.listen(process.env.PORT ?? 3000)
}

bootstrap()
