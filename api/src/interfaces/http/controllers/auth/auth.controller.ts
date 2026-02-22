import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { LoginUseCase } from '../../../../application/usecases/auth/login.usecase';
import { RegisterUserUseCase } from '../../../../application/usecases/auth/register-user.usecase';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginUser: LoginUseCase,
        private readonly registerUser: RegisterUserUseCase,
    ) { }

    @Post('login')
    @HttpCode(200)
    async login(@Body() body: { email: string; password: string }) {
        return this.loginUser.execute(body);
    }

    @Post('register')
    async register(@Body() body: { email: string; password: string }) {
        return this.registerUser.execute(body);
    }
}