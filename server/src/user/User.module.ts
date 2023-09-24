import { Module } from '@nestjs/common';

import { UserRouter } from './User.router';

@Module({
    providers: [UserRouter],
    exports: [UserRouter]
})
export class UserModule {}
