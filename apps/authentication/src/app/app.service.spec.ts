import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { TokenEntity } from '../tokens/entities/token.entity';
import { KeyDatum } from '../key-data/entities/key-datum.entity';
import { SaltedHashService } from '@optomistic-tanuki/encryption';
import { KeyService } from './key.service';
import { RpcException } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { Repositories } from '../constants';
import { create } from 'axios';

describe('AppService', () => {
  let service: AppService;
  let userRepo: Repository<UserEntity>;
  let tokenRepo: Repository<TokenEntity>;
  let saltedHashService: SaltedHashService;
  let authenticator;
  let keyService: KeyService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
          }
        },
        {
          provide: getRepositoryToken(TokenEntity),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          }
        },
        {
          provide: getRepositoryToken(KeyDatum),
          useValue: {
            save: jest.fn(),
          }
        },
        {
          provide: SaltedHashService,
          useValue: {
            validateHash: jest.fn(),
            createNewHash: jest.fn(),
          },
        },
        {
          provide: KeyService,
          useValue: {
            generateUserKeys: jest.fn(),
          },
        },
        {
          provide: 'totp',
          useValue: {
            check: jest.fn(),
          },
        },
        {
          provide: 'JWT_SECRET',
          useValue: 'test-secret',
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
    userRepo = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    tokenRepo = module.get<Repository<TokenEntity>>(getRepositoryToken(TokenEntity));
    saltedHashService = module.get<SaltedHashService>(SaltedHashService);
    keyService = module.get<KeyService>(KeyService);
    authenticator = module.get('totp');
  });

    const email = "thomasmorrow@adayaway.com";
    const pw = "password";
  // it("should throw an error on invalid email for login", async () => {
  //   const email = "blergnotanemail";
  //   const pw = "password";
  //   expect(service.login(email, pw)).rejects.toThrow(RpcException);    
  // });

  it("should error when the user is not found", async () => {
    (userRepo.findOne as jest.Mock).mockResolvedValue(null);
    await expect(service.login(email, pw)).rejects.toThrow(RpcException);
  });

  it("should error when passwords do not match", async () => {
    (saltedHashService.validateHash as jest.Mock).mockResolvedValue(false);
    (userRepo.findOne as jest.Mock).mockResolvedValue({
      email,
      password: "wrongPassword",
      keyData: { salt: "" },
    });
    await expect(service.login(email, pw)).rejects.toThrow(RpcException);
  });

  it("should error when MFA is required but not provided", async () => {
    (userRepo.findOne as jest.Mock).mockResolvedValue({
      email,
      password: "hashedPassword",
      keyData: { salt: "" },
      totpSecret: "totpSecret",
    });
    (saltedHashService.validateHash as jest.Mock).mockResolvedValue(true);
    await expect(service.login(email, pw)).rejects.toThrow(RpcException);
  });

  it("should error when MFA is invalid", async () => {
    (userRepo.findOne as jest.Mock).mockResolvedValue({
      email,
      password: "hashedPassword",
      keyData: { salt: "" },
      totpSecret: "totpSecret",
    });
    (saltedHashService.validateHash as jest.Mock).mockResolvedValue(true);
    (authenticator.check as jest.Mock).mockReturnValue(false);
    await expect(service.login(email, pw, "invalidMfa")).rejects.toThrow(RpcException);
  });

  it("should successfully login the user", async () => {
    (userRepo.findOne as jest.Mock).mockResolvedValue({
      id: "user-id",
      email,
      password: "hashedPassword",
      keyData: { salt: "salt" },
      firstName: "Thomas",
      lastName: "Morrow",
      totpSecret: "totpSecret",
    });
    (saltedHashService.validateHash as jest.Mock).mockResolvedValue(true);
    (authenticator.check as jest.Mock).mockReturnValueOnce(true);
    const result = await service.login(email, pw, "validMfa");
    expect(result.data).toHaveProperty('newToken');
    expect(result).toHaveProperty('code');
    expect(result).toHaveProperty('message');
    expect(result.code).toBe(0);
    expect(result.message).toBe('Login successful');
  });

  // Add more tests for registerUser, resetPassword, and validateToken methods

  it("should throw an error when passwords do not match during registration", async () => { 
    expect(service.registerUser(email, "Thomas", "Morrow", pw, "differentPassword")).rejects.toThrow(RpcException);
  });

  it("should throw an error when the email is malformed during registration", async () => {
    expect(service.registerUser("invalidEmail", "Thomas", "Morrow", pw, pw)).rejects.toThrow(RpcException);
  });

  it("should throw an error when the user already exists during registration", async () => {
    (userRepo.findOne as jest.Mock).mockResolvedValue({ email });
    await expect(service.registerUser(email, "Thomas", "Morrow", pw, pw)).rejects.toThrow(RpcException);
  });

  it("should successfully register a user", async () => {
    (userRepo.findOne as jest.Mock).mockResolvedValue(null);
    (saltedHashService.validateHash as jest.Mock).mockResolvedValue(true);
    (saltedHashService.createNewHash as jest.Mock).mockResolvedValue({password: "hashedPassword", salt: 'salt'});
    (keyService.generateUserKeys as jest.Mock).mockResolvedValue({ publicKey: 'publicKey', privateKey: 'private' });

    const result = await service.registerUser(email, "Thomas", "Morrow", pw, pw);
    expect(result).toHaveProperty('message');
    expect(result.message).toBe('User registered successfully');
  });

});