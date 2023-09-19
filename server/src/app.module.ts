import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvVars, validate } from './config/env.validation';

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
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
