import { Injectable } from '@nestjs/common';
import { AsymmetricService } from '@optomistic-tanuki/encryption';

import { writeFile } from 'fs/promises';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

@Injectable()
export class KeyService {
  constructor(private readonly keyService: AsymmetricService){}

  async generateUserKeys(userId: string, hash: string) {
    try {
    const { private: privKey, public: pubKey } = await this.keyService.generateKeyPair(hash);
    // STORE THE PRIVATE KEY FOR DELIVERY THROUGH OTHER MEANS.
    const cacheLocation = join(__dirname, `cache`);
    if(!existsSync(cacheLocation)) {
      mkdirSync(cacheLocation);
    }
    const privLocation = join(cacheLocation, `${userId}.priv`);
    await writeFile(privLocation, privKey, 'utf-8');
    // RETURN THE PUBLIC KEY SO THAT IT CAN BE USED IN THE APPLICATION.
    // RETURN URL FOR PRIVATE KEY.
    return { pubKey, privLocation }
    } catch (e) {
      console.error(e);
    }
  }
}