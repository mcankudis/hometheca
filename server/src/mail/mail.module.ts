import { LoggerModule } from '@logging';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './mail.service';

@Module({
    imports: [ConfigModule.forRoot(), LoggerModule],
    providers: [MailService],
    exports: [MailService]
})
export class MailModule {}
