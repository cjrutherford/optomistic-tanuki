import { Inject, Injectable } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { SaltedHashService } from '@optomistic-tanuki/encryption';
import { RpcException } from '@nestjs/microservices';
import * as jwt from 'jsonwebtoken';
import * as qrcode from 'qrcode';
import { TokenEntity } from '../tokens/entities/token.entity';
import { KeyService } from './key.service';
import { KeyDatum } from '../key-data/entities/key-datum.entity';
import { Repositories } from '../constants';
import { randomBytes } from 'crypto';
import { authenticator } from 'otplib';

@Injectable()
export class AppService {
  constructor(
    @Inject(getRepositoryToken(UserEntity))
    private readonly userRepo: Repository<UserEntity>,
    @Inject(getRepositoryToken(TokenEntity))
    private readonly tokenRepo: Repository<TokenEntity>,
    @Inject(getRepositoryToken(KeyDatum)) private readonly keyRepo: Repository<KeyDatum>,
    private readonly saltedHashService: SaltedHashService,
    private readonly keyService: KeyService,
    @Inject('JWT_SECRET') private readonly jwtSecret: string,
    @Inject('totp') private readonly totp: typeof authenticator,
  ) {}

  async login(email: string, password: string, mfa?: string) {
    // Implement your login logic here
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new RpcException('User not found');
    }

    // Check password and MFA here
    const {
      id: userId,
      password: storedHash,
      keyData: { salt },
    } = user;

    const valid = await this.saltedHashService.validateHash(
      password,
      storedHash,
      salt
    );

    if (!valid) {
      throw new RpcException('Invalid password');
    }

    if(mfa !== undefined) {
      const isValidMfa = this.totp.check(mfa, user.totpSecret);
      if (!isValidMfa) {
        throw new RpcException('Invalid MFA token');
      }
    } else if (user.totpSecret !== undefined && mfa === undefined) {
      throw new RpcException('MFA token is required for this user.');
    }

    const pl = { userId, name: `${user.firstName} ${user.lastName}`, email };
    const tk = jwt.sign(pl, this.jwtSecret, { expiresIn: '1h' });

    delete user.keyData;
    delete user.password;
    const ntk = {
      tokenData: tk,
      userId,
      user,
      revoked: false,
    };
    await this.tokenRepo.save(ntk);

    return { message: 'Login successful', code: 0, data: { newToken: tk } };
  }

  async registerUser(
    email: string,
    fn: string,
    ln: string,
    password: string,
    confirm: string
  ) {
    // Implement your registration logic here
    if (password !== confirm) {
      throw new RpcException('Passwords do not match');
    }
    if (
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
        email
      )
    )
      throw new RpcException('Invalid Email');

    const existingUser = await this.userRepo.findOne({ where: { email } });
    if (existingUser) {
      throw new RpcException('User already exists');
    }

    const { salt, hash } = this.saltedHashService.createNewHash(password);

    const newUser = (await this.userRepo.save({
      email,
      firstName: fn,
      lastName: ln,
      password: hash,
      keyData: { salt },
    })) as UserEntity;
    const { pubKey, privLocation } = await this.keyService.generateUserKeys(
      newUser.id,
      hash
    );
    const nk: Partial<KeyDatum> = {
      public: Buffer.from(pubKey),
      salt: salt.toString(),
    };
    const newKeyData = await this.keyRepo.save({ ...nk });
    newUser.keyData = newKeyData;
    await this.userRepo.save(newUser);

    return {
      message: 'User Created',
      code: 0,
      data: {
        pub: pubKey,
        user: newUser.id,
        privKey: privLocation,
        inventory: undefined,
      },
    };
  }

  async resetPassword(email: string, newPassword: string, confirm: string, oldPass: string,  mfa?: string) {
    // Implement your password reset logic here
    if (newPassword !== confirm) {
      throw new RpcException('Passwords do not match');
    }

    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new RpcException('User not found');
    }

    const valid = await this.saltedHashService.validateHash(
      oldPass,
      user.password,
      user.keyData.salt
    );

    if (!valid) {
      throw new RpcException('Invalid old password');
    }

    if(mfa !== undefined) {
      const isValidMfa = authenticator.check(mfa, user.totpSecret);
      if (!isValidMfa) {
        throw new RpcException('Invalid MFA token');
      }
    } else if (user.totpSecret !== undefined && mfa === undefined) {
      throw new RpcException('MFA token is required for this user.');
    }

    const { salt, hash } = this.saltedHashService.createNewHash(newPassword);
    user.password = hash;
    user.keyData.salt = salt;
    await this.userRepo.save(user);
    return { message: 'Password reset successful', code: 0 };
  }

  async validateToken(token: string) {
    try {
      const decoded = jwt.verify(token, this.jwtSecret);
      const storedToken = await this.tokenRepo.findOne({
        where: { tokenData: token },
      });
      if (!storedToken || storedToken.revoked) {
        throw new RpcException('Token is invalid or revoked');
      }
      return { message: 'Token is valid', code: 0, data: decoded };
    } catch (e) {
      throw new RpcException('Invalid token');
    }
  }

  async setupTotp( userId: string ) {
    // Implement your TOTP setup logic here
    const newSecret = randomBytes(20).toString('hex');
    await this.userRepo.update(userId, { totpSecret: newSecret });
    return { message: 'TOTP setup successful', code: 0, data: { qr: qrcode.toDataURL(authenticator.keyuri( userId, "optomistic-tanuki", newSecret )) } };
  }

  async validateTotp( userId: string, token: string ) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user || !user.totpSecret) {
      throw new RpcException('User not found or TOTP not set up');
    }
    const isValid = this.totp.check(token, user.totpSecret);
    if (!isValid) {
      throw new RpcException('Invalid TOTP token');
    }
    return { message: 'TOTP token is valid', code: 0 };
  }
}
