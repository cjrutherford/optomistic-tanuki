import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from './app.module';
import loadConfig from '../config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@optomistic-tanuki/database';
import { LoggerModule } from '@optomistic-tanuki/logger';
import { Repositories } from '../constants';
import { UserEntity } from '../user/entities/user.entity';
import { TokenEntity } from '../tokens/entities/token.entity';
import { KeyDatum } from '../key-data/entities/key-datum.entity';
describe('AppModule', () => {
    let appModule: TestingModule;

    beforeAll(async () => {
        appModule = await Test.createTestingModule({
            imports: [AppModule],
        })
        .overrideProvider(AppService)
        .useValue({}) // Mock AppService
        .compile();
    });

    it('should load ConfigModule with isGlobal set to true', () => {
        const configModule = appModule.get<ConfigModule>(ConfigModule);
        expect(configModule).toBeDefined();
        expect(configModule['isGlobal']).toBe(true);
    });

    it('should load configuration using loadConfig function', () => {
        const configModule = appModule.get<ConfigModule>(ConfigModule);
        expect(configModule).toBeDefined();
        expect(configModule['load']).toContain(loadConfig);
    });

    it('should have AppController defined', () => {
        const appController = appModule.get<AppController>(AppController);
        expect(appController).toBeDefined();
    });

    it('should have AppService defined', () => {
        const appService = appModule.get<AppService>(AppService);
        expect(appService).toBeDefined();
    });

    it('should load DatabaseModule with correct configuration', () => {
        const databaseModule = appModule.get<DatabaseModule>(DatabaseModule);
        expect(databaseModule).toBeDefined();
    });

    it('should load LoggerModule', () => {
        const loggerModule = appModule.get<LoggerModule>(LoggerModule);
        expect(loggerModule).toBeDefined();
    });

    it('should provide User repository', () => {
        const userRepository = appModule.get(Repositories.User);
        expect(userRepository).toBeDefined();
        expect(userRepository.target).toBe(UserEntity);
    });

    it('should provide Token repository', () => {
        const tokenRepository = appModule.get(Repositories.Token);
        expect(tokenRepository).toBeDefined();
        expect(tokenRepository.target).toBe(TokenEntity);
    });

    it('should provide KeyData repository', () => {
        const keyDataRepository = appModule.get(Repositories.KeyData);
        expect(keyDataRepository).toBeDefined();
        expect(keyDataRepository.target).toBe(KeyDatum);
    });
});
