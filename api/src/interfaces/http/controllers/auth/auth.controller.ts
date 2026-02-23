import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './auth.dto';
import { LoginUseCase } from 'src/application/usecases/auth/login.usecase';
import { RegisterUserUseCase } from 'src/application/usecases/auth/register-user.usecase';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginUser: LoginUseCase,
        private readonly registerUser: RegisterUserUseCase,
    ) { }

    @Post('login')
    @HttpCode(200)
    @ApiBody({ type: LoginDto })
    @ApiResponse({ status: 200, description: 'User logged in' })
    async login(@Body() body: LoginDto) {
        return this.loginUser.execute(body);
    }

    @Post('register')
    @ApiBody({ type: RegisterDto })
    @ApiResponse({ status: 201, description: 'User registered' })
    async register(@Body() body: RegisterDto) {
        return this.registerUser.execute(body);
    }
}