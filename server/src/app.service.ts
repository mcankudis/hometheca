import { Injectable } from '@nestjs/common';
import { DatadogLogger } from './logging/DatadogLogger';

@Injectable()
export class AppService {
    constructor(private readonly Logger: DatadogLogger) {}
    getHello(): string {
        this.Logger.log('Hello World!');
        return 'Hello World!';
    }
}
