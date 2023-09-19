import { Module } from '@nestjs/common';
import { DatadogLogger } from './DatadogLogger';

@Module({
    providers: [DatadogLogger],
    exports: [DatadogLogger]
})
export class LoggerModule {}
