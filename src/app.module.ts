import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { CoffeesModule } from './coffees/coffees.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LoggerMiddleware } from './common/logger.middleware'
import { DataSource } from 'typeorm'
import { ConfigModule } from '@nestjs/config'
import * as process from 'node:process'

@Module({
  imports: [
    CoffeesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password:process.env.DATABASE_PASSWD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  logger = new Logger('AppModule')

  constructor(private dataSource: DataSource) {
    this.logger.log(`Connected to database ${dataSource.driver.database}`)
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
