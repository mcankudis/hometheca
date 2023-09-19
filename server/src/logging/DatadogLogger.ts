import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvVars } from 'src/config/env.validation';
import {
    Logger as WinstonLogger,
    createLogger,
    format,
    transports
} from 'winston';

@Injectable()
export class DatadogLogger extends ConsoleLogger {
    private Logger: WinstonLogger;
    private stage: string;
    constructor(private readonly config: ConfigService<EnvVars>) {
        super();
        this.stage = this.config.get('environment') ?? 'production';

        const url = this.config.get('DATADOG_URL');
        const key = this.config.get('DATADOG_API_KEY');

        const httpTransportOptions = {
            host: url,
            path: `/api/v2/logs?dd-api-key=${key}&ddsource=nodejs&service=Hometheca`,
            ssl: true
        };

        this.Logger = createLogger({
            level: 'debug',
            exitOnError: false,
            format: format.json(),
            transports: [new transports.Http(httpTransportOptions)]
        });
    }

    public log(message: any, ...optionalParams: any[]) {
        const flowIdParam = optionalParams?.find((param) => param.flowId);
        const flowId = flowIdParam?.flowId;
        const restParams = optionalParams?.filter(
            (param) => param !== flowIdParam
        );

        if (this.stage === 'production') {
            this.Logger.info(message, { flowId, ...restParams });
        }
        super.log(message, ...optionalParams);
    }

    public error(message: any, ...optionalParams: any[]) {
        const flowIdParam = optionalParams?.find((param) => param.flowId);
        const flowId = flowIdParam?.flowId;
        const restParams = optionalParams?.filter(
            (param) => param !== flowIdParam
        );

        if (this.stage === 'production') {
            this.Logger.error(message, { flowId, ...restParams });
        }
        super.error(message, ...optionalParams);
    }

    public warn(message: any, ...optionalParams: any[]) {
        const flowIdParam = optionalParams?.find((param) => param.flowId);
        const flowId = flowIdParam?.flowId;
        const restParams = optionalParams?.filter(
            (param) => param !== flowIdParam
        );

        if (this.stage === 'production') {
            this.Logger.warn(message, { flowId, ...restParams });
        }
        super.warn(message, ...optionalParams);
    }

    public debug(message: any, ...optionalParams: any[]) {
        const flowIdParam = optionalParams?.find((param) => param.flowId);
        const flowId = flowIdParam?.flowId;
        const restParams = optionalParams?.filter(
            (param) => param !== flowIdParam
        );

        if (this.stage === 'production') {
            this.Logger.debug(message, { flowId, ...restParams });
        }
        super.debug(message, ...optionalParams);
    }

    public verbose(message: any, ...optionalParams: any[]) {
        const flowIdParam = optionalParams?.find((param) => param.flowId);
        const flowId = flowIdParam?.flowId;
        const restParams = optionalParams?.filter(
            (param) => param !== flowIdParam
        );

        if (this.stage === 'production') {
            this.Logger.verbose(message, { flowId, ...restParams });
        }
        super.verbose(message, ...optionalParams);
    }
}
