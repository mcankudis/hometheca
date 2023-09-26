import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LoggerModule } from '@logging';
import { AuthService } from './Auth.service';
import { SessionDAO, SessionSchema } from './Session.schema';

@Module({
    imports: [
        LoggerModule,
        MongooseModule.forFeature([
            { name: SessionDAO.name, schema: SessionSchema }
        ])
    ],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}
