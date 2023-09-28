import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '@auth';
import { EnvVars, validate } from '@config';
import {
    FlowIdMiddleware,
    LoggerModule,
    RequestLoggerMiddleware
} from '@logging';
import { MailModule } from '@mail';
import { TrpcModule } from '@t';
import { UserModule } from '@user';
import { AppTrpcRouter } from './app.router';

@Module({
    imports: [
        AuthModule,
        ConfigModule.forRoot({
            validate,
            isGlobal: true
        }),
        LoggerModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService<EnvVars>) => {
                return {
                    uri: configService.get('DB_CONNECTION_STRING')
                };
            },
            inject: [ConfigService]
        }),
        TrpcModule,
        UserModule,
        MailModule
    ],
    controllers: [],
    providers: [AppTrpcRouter]
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestLoggerMiddleware).forRoutes('*');
        consumer.apply(FlowIdMiddleware).forRoutes('*');
    }
}
