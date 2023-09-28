import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '@auth';
import { LoggerModule } from '@logging';
import { MailModule } from '@mail';
import { TrpcModule } from '@t';
import { UserRouter } from './User.router';
import { UserDAO, UserSchema } from './User.schema';
import { UserService } from './User.service';

@Module({
    imports: [
        AuthModule,
        ConfigModule.forRoot(),
        MongooseModule.forFeature([{ name: UserDAO.name, schema: UserSchema }]),
        LoggerModule,
        MailModule,
        TrpcModule
    ],
    providers: [UserRouter, UserService],
    exports: [UserRouter, UserService]
})
export class UserModule {}
