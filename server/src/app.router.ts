import { Injectable } from '@nestjs/common';

import { TrpcService } from '@t';
import { UserRouter } from '@user';

@Injectable()
export class AppTrpcRouter {
    constructor(
        private readonly trpc: TrpcService,
        private readonly userRouter: UserRouter
    ) {}

    public appRouter = this.trpc.router({
        user: this.userRouter.router
    });
}
