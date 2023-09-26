import { Injectable } from '@nestjs/common';

import { TrpcService } from '@t';
import { CreateUserDTO } from './User.dto';
import { UserService } from './User.service';

@Injectable()
export class UserRouter {
    constructor(
        private readonly trpc: TrpcService,
        private readonly userService: UserService
    ) {}

    public readonly router = this.trpc.router({
        createUser: this.trpc.procedure
            .input(CreateUserDTO)
            .mutation(({ input }) => {
                return this.userService.createUser(input);
            })
    });
}
