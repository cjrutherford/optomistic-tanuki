import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../Entities';
import { Authentication } from '@angry-panda/constants';

@Injectable()
export class LoginService {
  constructor(@Inject(Authentication.ProviderTokens.USER_REPO) private readonly userRepo: Repository<UserEntity>) {}

  async userExists(mail: string, firstName: string, lastName: string) {
    try {
      const user = await this.userRepo.findOne({where: {email: mail, firstName, lastName}});
      return !!user;
    } catch (e) {
      console.error(e);
    }
  }
}
