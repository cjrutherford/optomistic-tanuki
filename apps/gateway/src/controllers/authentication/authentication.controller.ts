import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { EnableMultiFactorRequest, LoginRequest, RegisterRequest, ResetPasswordRequest, ValidateTokenRequest } from '@optomistic-tanuki/libs/models'
import { firstValueFrom } from 'rxjs';
import { AuthCommands } from '@optomistic-tanuki/libs/constants'

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
    constructor(@Inject('AUTHENTICATION_SERVICE') private readonly authClient: ClientProxy){}

    @Post('login')
    async loginUser(@Body() data: LoginRequest) {
        return await firstValueFrom(this.authClient.send({ cmd: AuthCommands.Login }, data));
    }

    @Post('register')
    async registerUser(@Body() data: RegisterRequest) {
        return await firstValueFrom(this.authClient.send({ cmd: AuthCommands.Register }, data));
    }

    @Post('reset')
    async resetPassword(@Body() data: ResetPasswordRequest) {
        return await firstValueFrom(this.authClient.send({ cmd: AuthCommands.ResetPassword }, data))
    }

    @Post('enable-mfa')
    async enableMfa(@Body() data: EnableMultiFactorRequest) {
        return await firstValueFrom(this.authClient.send({ cmd: AuthCommands.EnableMultiFactor }, data))
    }

    @Post('validate')
    async validateToken(@Body() data: ValidateTokenRequest) {
        return await firstValueFrom(this.authClient.send({ cmd: AuthCommands.Validate }, data))
    }

    @Post('validate-mfa')
    async validateMfa(@Body() data: { userId: string, token: string }) {
        return await firstValueFrom(this.authClient.send({ cmd: AuthCommands.ValidateTotp }, data))
    }
}
