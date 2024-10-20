import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import loadConfig from '../config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@optomistic-tanuki/database';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
