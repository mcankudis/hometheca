import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { DatadogLogger } from './DatadogLogger';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
    constructor(private readonly Logger: DatadogLogger) {}
    use(req: Request, _res: Response, next: NextFunction) {
        this.Logger.log(`${req.method} ${req.originalUrl}`);
        next();
    }
}
