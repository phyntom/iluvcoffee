import { Injectable, Logger, NestMiddleware } from '@nestjs/common'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name, { timestamp: true })
  use(req: any, res: any, next: () => void) {
    this.logger.log(`Request ${req.method} ${req.url} ${req.ip}`)
    next()
  }
}
