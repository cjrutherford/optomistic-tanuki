import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import loadConfig from '../config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@optomistic-tanuki/database';
import loadDatabase from './loadDatabase';
import { UserEntity } from '../user/entities/user.entity';
import { TokenEntity } from '../tokens/entities/token.entity';
import { KeyDatum } from '../key-data/entities/key-datum.entity';
import { Repositories } from '../constants';
import { LoggerModule } from '@optomistic-tanuki/logger';
import { AsymmetricService, SaltedHashService } from '@optomistic-tanuki/encryption';
import { KeyService } from './key.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { authenticator } from 'otplib';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadConfig],
    }),
    DatabaseModule.register({
      name: 'authentication',
      factory: loadDatabase,
    }),
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SaltedHashService,
    KeyService,
    AsymmetricService,
    {
      provide: 'totp',
      useValue: authenticator,
    },
    {
      provide: 'JWT_SECRET',
      useFactory: (config: ConfigService) => config.get('auth').jwt_secret!,
      inject: [ConfigService],
    },
    {
      provide: getRepositoryToken (UserEntity),
      useFactory: (ds: any) => ds.getRepository(UserEntity),
      inject: ['AUTHENTICATION_CONNECTION'],
    },{
      provide: getRepositoryToken(TokenEntity),
      useFactory: (ds: any) => ds.getRepository(TokenEntity),
      inject: ['AUTHENTICATION_CONNECTION'],
    },{
      provide: getRepositoryToken(KeyDatum),
      useFactory: (ds: any) => ds.getRepository(KeyDatum),
      inject: ['AUTHENTICATION_CONNECTION'],
    }
  ],
})
export class AppModule {}
