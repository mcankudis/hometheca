import { Injectable } from '@nestjs/common';
import { TRPCError, initTRPC } from '@trpc/server';

import { AuthService } from '@auth';
import { DatadogLogger } from '@logging';
import { Context } from './Context';

@Injectable()
export class TrpcService {
    public readonly trpc = initTRPC.context<Context>().create();
    public readonly procedure = this.trpc.procedure;

    public readonly router = this.trpc.router;

    constructor(
        private readonly authService: AuthService,
        private readonly Logger: DatadogLogger
    ) {}

    public ensureAuthenticated = this.trpc.middleware(async ({ ctx, next }) => {
        try {
            const session = await this.authService.verifySession(
                ctx.req.cookies['session_token']
            );

            return next({
                ctx: {
                    ...ctx,
                    session
                }
            });
        } catch (error) {
            this.Logger.error('Error veryfing session', error);
            throw new TRPCError({ code: 'UNAUTHORIZED' });
        }
    });

    public readonly protectedProcedure = this.trpc.procedure.use(
        this.ensureAuthenticated
    );
}
