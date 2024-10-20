import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from './app.module';
import loadConfig from '../config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// another comment...

// describe('AppModule', () => {
//     let appModule: TestingModule;

//         beforeAll(async () => {
//             appModule = await Test.createTestingModule({
//                 imports: [AppModule],
//             })
//             .overrideProvider(AppService)
//             .useValue({}) // Mock AppService
//             .compile();
//         });

//         it('should load ConfigModule with isGlobal set to true', () => {
//             const configModule = appModule.get<ConfigModule>(ConfigModule);
//             expect(configModule).toBeDefined();
//             expect(configModule['isGlobal']).toBe(true);
//         });

//         it('should load configuration using loadConfig function', () => {
//             const configModule = appModule.get<ConfigModule>(ConfigModule);
//             expect(configModule).toBeDefined();
//             expect(configModule['load']).toContain(loadConfig);
//         });

//         it('should have AppController defined', () => {
//             const appController = appModule.get<AppController>(AppController);
//             expect(appController).toBeDefined();
//         });

//         it('should have AppService defined', () => {
//             const appService = appModule.get<AppService>(AppService);
//             expect(appService).toBeDefined();
//         });

//     it('should load ConfigModule with isGlobal set to true', () => {
//         const configModule = appModule.get<ConfigModule>(ConfigModule);
//         expect(configModule).toBeDefined();
//         expect(configModule['isGlobal']).toBe(true);
//     });

//     it('should load configuration using loadConfig function', () => {
//         const configModule = appModule.get<ConfigModule>(ConfigModule);
//         expect(configModule).toBeDefined();
//         expect(configModule['load']).toContain(loadConfig);
//     });
// });