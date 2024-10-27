import { Controller, Get } from '@nestjs/common';
import { AuthCommands } from '@optomistic-tanuki/libs/constants';
import { AppService } from './app.service';
import { LoginRequest } from '@optomistic-tanuki/libs/models';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: AuthCommands.Login })
  async login(@Payload() data: LoginRequest) {
    try {
      console.log('login', data);
    } catch (e) {
      console.error(e);
      throw new RpcException(e);
    }
  }
}
