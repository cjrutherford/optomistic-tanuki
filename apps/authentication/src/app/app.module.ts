import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
    {
      provide: Repositories.User,
      useFactory: (ds: any) => ds.getRepository(UserEntity),
      inject: ['AUTHENTICATION_CONNECTION'],
    },{
      provide: Repositories.Token,
      useFactory: (ds: any) => ds.getRepository(TokenEntity),
      inject: ['AUTHENTICATION_CONNECTION'],
    },{
      provide: Repositories.KeyData,
      useFactory: (ds: any) => ds.getRepository(KeyDatum),
      inject: ['AUTHENTICATION_CONNECTION'],
    }
  ],
})
export class AppModule {}
