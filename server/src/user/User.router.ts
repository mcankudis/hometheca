import { Injectable } from '@nestjs/common';
import { serialize } from 'cookie';
import { Response } from 'express';

import { AuthService } from '@auth';
import { DatadogLogger } from '@logging';
import { TrpcService } from '@t';
import { CreateUserDTO, LoginUserDTO } from './User.dto';
import { UserService } from './User.service';

@Injectable()
export class UserRouter {
    constructor(
        private readonly Logger: DatadogLogger,
        private readonly trpc: TrpcService,
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) {}

    public readonly router = this.trpc.router({
        createUser: this.trpc.procedure
            .input(CreateUserDTO)
            .mutation(({ input }) => {
                return this.userService.createUser(input);
            }),
        login: this.trpc.procedure
            .input(LoginUserDTO)
            .mutation(async ({ input, ctx }) => {
                this.Logger.log(`User login: ${input.username}`);

                const user = await this.userService.authenticateUser(
                    input.username,
                    input.password
                );

                this.Logger.log(`User authenticated`);

                const session = await this.authService.createSession(user.id);

                this.setSessionCookie(ctx.res, session.sessionId);

                this.Logger.log(`User ${user.id} logged in, session created`);

                return { success: true };
            }),
        protectedTest: this.trpc.protectedProcedure.query(({ ctx }) => {
            return { test: ctx.session };
        })
    });

    private setSessionCookie(res: Response, sessionId: string) {
        const THIRTY_DAYS = 60 * 60 * 24 * 30;
        const secure = process.env.NODE_ENV === 'production';

        res.setHeader('Set-Cookie', [
            serialize('session_token', sessionId, {
                httpOnly: true,
                maxAge: THIRTY_DAYS,
                path: '/',
                secure
            })
        ]);
    }
}
