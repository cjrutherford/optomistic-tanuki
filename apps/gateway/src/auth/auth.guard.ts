import { CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { AuthCommands } from '@optomistic-tanuki/libs/constants';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('AUTHENTICATION_SERVICE') private authService: ClientProxy, private reflector: Reflector) {}

  private async introspectToken(token: string) {
      return firstValueFrom(this.authService.send({ cmd: AuthCommands.Validate }, { token }));
  }

  private parseToken(token: string) {
      // Assuming the token is a JWT token
      const payload = Buffer.from(token.split('.')[1], 'base64').toString('utf-8');
      return JSON.parse(payload);
  }

  async canActivate(
      context: ExecutionContext,
  ): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers['authorization'];
      if (!authHeader) {
          console.log("😵 No Auth Header Provided")
          throw new HttpException('Unauthorized: No Authorization Header', HttpStatus.UNAUTHORIZED);
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
            console.log("😵 No Token Found");
          throw new HttpException('Unauthorized: No Token Found.', HttpStatus.UNAUTHORIZED);
      }
      const isAuthenticated = await this.introspectToken(token);

      if (!isAuthenticated) {
            console.log("😵 Token Invalid");
          throw new HttpException('Unauthorized: Token Invalid.', HttpStatus.UNAUTHORIZED);
      }

      const user = this.parseToken(token);
      request.user = user;

      return true;
  }
}
