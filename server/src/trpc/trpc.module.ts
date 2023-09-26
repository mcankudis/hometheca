import { Module } from '@nestjs/common';

import { AuthModule } from '@auth';
import { LoggerModule } from '@logging';
import { TrpcService } from './trpc.service';

@Module({
    imports: [AuthModule, LoggerModule],
    controllers: [],
    providers: [TrpcService],
    exports: [TrpcService]
})
export class TrpcModule {}
