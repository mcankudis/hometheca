import { NestFactory } from '@nestjs/core';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import * as cookieParser from 'cookie-parser';
import { Response } from 'express';
import helmet from 'helmet';
import { renderTrpcPanel } from 'trpc-panel';

import { AppModule } from './app.module';
import { AppTrpcRouter } from './app.router';
import { createContext } from './trpc/Context';

const mode = process.env.NODE_ENV ?? 'development';
const config = mode === 'production' ? {} : { cors: true };

async function bootstrap() {
    const app = await NestFactory.create(AppModule, config);

    app.use(cookieParser());

    if (mode === 'production') {
        app.use(helmet());
    }

    if (mode === 'development') {
        app.use('/panel', (_: unknown, res: Response) => {
            return res.send(
                renderTrpcPanel(router.appRouter, {
                    url: 'http://localhost:3000/trpc'
                })
            );
        });
        app.use('/trpc', helmet());
    }

    const router = app.get(AppTrpcRouter);
    app.use(
        '/trpc',
        createExpressMiddleware({
            router: router.appRouter,
            createContext
        })
    );

    await app.listen(3000);
}
bootstrap();
