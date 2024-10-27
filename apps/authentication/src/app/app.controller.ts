import { Controller, Get } from '@nestjs/common';
import { AuthCommands } from '@optomistic-tanuki/libs/constants';
import { AppService } from './app.service';
import { LoginRequest, ResetPasswordRequest } from '@optomistic-tanuki/libs/models';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: AuthCommands.Login })
  async login(@Payload() data: LoginRequest) {
    try {
      const { email, password, mfa } = data;
      return await this.appService.login(email, password, mfa);
    } catch (e) {
      console.error(e);
      throw new RpcException(e);
    }
  }

  @MessagePattern({ cmd: AuthCommands.Register })
  async register(@Payload() data: any) {
    try {
      const { email, fn, ln, password, confirm } = data;
      return await this.appService.registerUser(email, fn, ln, password, confirm);
    } catch (e) {
      console.error(e);
      throw new RpcException(e);
    }
  }

  @MessagePattern({ cmd: AuthCommands.ResetPassword })
  async resetPassword(@Payload() data: ResetPasswordRequest) {
    try {
      const {email, newPass, newConf, oldPass, mfa } = data;
      return await this.appService.resetPassword(email, newPass, newConf, oldPass, mfa);
    } catch (e) {
      console.error(e);
      throw new RpcException(e);
    }
  }

  @MessagePattern({ cmd: AuthCommands.Validate })
  async validate(@Payload() data: any) {
    try {
      const { token } = data;
      return await this.appService.validateToken(token);
    } catch (e) {
      console.error(e);
      throw new RpcException(e);
    }
  }
}
