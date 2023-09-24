import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { EnvVars, validate } from '@config';
import {
    FlowIdMiddleware,
    LoggerModule,
    RequestLoggerMiddleware
} from '@logging';
import { TrpcModule } from '@t';
import { AppTrpcRouter } from './app.router';
import { UserModule } from './user/User.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            validate,
            isGlobal: true
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService<EnvVars>) => {
                return {
                    uri: configService.get('DB_CONNECTION_STRING')
                };
            },
            inject: [ConfigService]
        }),
        LoggerModule,
        UserModule,
        TrpcModule
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
