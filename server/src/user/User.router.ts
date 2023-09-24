import { Injectable } from '@nestjs/common';

import { TrpcService } from '@t';

@Injectable()
export class UserRouter {
    constructor(private readonly trpc: TrpcService) {}

    public readonly router = this.trpc.router({
        createUser: this.trpc.procedure.mutation(() => {
            // todo
        })
    });
}
