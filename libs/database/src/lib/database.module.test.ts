import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions, EntitySchema } from 'typeorm';
import { DatabaseModule } from './database.module';

describe('DatabaseModule', () => {
    let configService: ConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ConfigService,
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn(),
                    },
                },
            ],
        }).compile();

        configService = module.get<ConfigService>(ConfigService);
    });

    it('should register connections and repositories', async () => {
        const mockDataSourceOptions: DataSourceOptions = {
            type: 'sqlite',
            database: ':memory:',
            entities: [
                new EntitySchema({
                    name: 'TestEntity',
                    columns: {
                        id: {
                            type: 'int',
                            primary: true,
                            generated: true,
                        },
                        name: {
                            type: 'varchar',
                        },
                    },
                }),
            ],
        };

        const mockFactory = jest.fn().mockReturnValue(mockDataSourceOptions);

        const dynamicModule = DatabaseModule.register({
            name: 'test',
            factory: mockFactory,
        });

        expect(dynamicModule.module).toBe(DatabaseModule);
        expect(dynamicModule.global).toBe(true);
        expect(dynamicModule.providers).toHaveLength(2); // One connection and one repository
        expect(dynamicModule.exports).toHaveLength(2); // One connection and one repository

        const connectionProvider = dynamicModule.providers[0];
        const repositoryProvider = dynamicModule.providers[1];

        expect(connectionProvider.provide).toBe('TEST_CONNECTION');
        expect(connectionProvider.useFactory).toBeInstanceOf(Function);
        expect(connectionProvider.inject).toContain(ConfigService);

        const dataSource = await connectionProvider.useFactory(configService);
        expect(dataSource).toBeInstanceOf(DataSource);
        expect(dataSource.options).toEqual(mockDataSourceOptions);

        expect(repositoryProvider.provide).toBe('TEST_TESTENTITY_REPOSITORY');
        expect(repositoryProvider.useFactory).toBeInstanceOf(Function);
        expect(repositoryProvider.inject).toContain('TEST_CONNECTION');
    });
});