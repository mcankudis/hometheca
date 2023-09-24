import { NestFactory } from '@nestjs/core';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { renderTrpcPanel } from 'trpc-panel';

import { Response } from 'express';
import { AppModule } from './app.module';
import { AppTrpcRouter } from './app.router';

const mode = process.env.NODE_ENV ?? 'development';
const config = mode === 'production' ? {} : { cors: true };

async function bootstrap() {
    const app = await NestFactory.create(AppModule, config);
    const router = app.get(AppTrpcRouter);
    app.use(
        `/trpc`,
        createExpressMiddleware({
            router: router.appRouter
        })
    );
    if (mode === 'development') {
        app.use('/panel', (_: unknown, res: Response) => {
            return res.send(
                renderTrpcPanel(router.appRouter, {
                    url: 'http://localhost:3000/trpc'
                })
            );
        });
    }
    await app.listen(3000);
}
bootstrap();
