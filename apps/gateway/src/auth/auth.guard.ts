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

  canActivate(
      context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers['authorization'];
      if (!authHeader) {
          throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
          throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
      const isAuthenticated = this.introspectToken(token);

      if (!isAuthenticated) {
          throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      return true;
  }
}
