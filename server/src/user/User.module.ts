import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LoggerModule } from '@logging';
import { TrpcModule } from '@t';
import { UserRouter } from './User.router';
import { UserDAO, UserSchema } from './User.schema';
import { UserService } from './User.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: UserDAO.name, schema: UserSchema }]),
        LoggerModule,
        TrpcModule
    ],
    providers: [UserRouter, UserService],
    exports: [UserRouter]
})
export class UserModule {}
