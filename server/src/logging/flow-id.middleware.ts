import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class FlowIdMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const flowId = randomUUID();
        req.headers['x-flow-id'] = flowId;
        res.setHeader('X-Flow-ID', flowId);
        next();
    }
}
