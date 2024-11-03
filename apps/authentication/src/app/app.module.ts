import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DatabaseModule } from '@optomistic-tanuki/database';
import { AsymmetricService, SaltedHashService } from '@optomistic-tanuki/encryption';
import { LoggerModule } from '@optomistic-tanuki/logger';
import * as jwt from 'jsonwebtoken';
import { authenticator } from 'otplib';
import { DataSource } from 'typeorm';
import loadConfig from '../config';
import { KeyDatum } from '../key-data/entities/key-datum.entity';
import { TokenEntity } from '../tokens/entities/token.entity';
import { UserEntity } from '../user/entities/user.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeyService } from './key.service';
import loadDatabase from './loadDatabase';

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
      useFactory: (config: ConfigService) => config.get('auth')?.jwt_secret || 'default_jwt_secret',
      inject: [ConfigService],
    },
    {
      provide: getRepositoryToken (UserEntity),
      useFactory: (ds: DataSource) => ds.getRepository(UserEntity),
      inject: ['AUTHENTICATION_CONNECTION'],
    },{
      provide: getRepositoryToken(TokenEntity),
      useFactory: (ds: DataSource) => ds.getRepository(TokenEntity),
      inject: ['AUTHENTICATION_CONNECTION'],
    },{
      provide: getRepositoryToken(KeyDatum),
      useFactory: (ds: DataSource) => ds.getRepository(KeyDatum),
      inject: ['AUTHENTICATION_CONNECTION'],
    },{
      provide: 'jwt',
      useValue: jwt,
    }
  ],
})
export class AppModule {}
