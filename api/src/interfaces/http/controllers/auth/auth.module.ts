import { Module } from '@nestjs/common';
import { PASSWORD_HASH } from 'src/application/injection-tokens/password-comparer.token';
import { USER_REPOSITORY } from 'src/application/injection-tokens/user-repository.token';
import { LoginUseCase } from '../../../../application/usecases/auth/login.usecase';
import { RegisterUserUseCase } from '../../../../application/usecases/auth/register-user.usecase';
import { PrismaService } from '../../../../infrastructure/database/postgres/prisma.service';
import { PostgresUserRepository } from '../../../../infrastructure/repositories/postgres/postgres-user.repository';
import { AuthController } from './auth.controller';
import { PasswordHasher } from 'src/application/security/password-hasher';
import { JwtSignerService } from 'src/application/security/jwt-signer.service';
import { JWT_SIGN } from 'src/application/injection-tokens/jwt-sign.token';

@Module({
    controllers: [AuthController],
    providers: [
        PrismaService,
        LoginUseCase,
        RegisterUserUseCase,
        {
            provide: USER_REPOSITORY,
            useClass: PostgresUserRepository,
        },
        {
            provide: PASSWORD_HASH,
            useClass: PasswordHasher,
        },
        {
            provide: JWT_SIGN,
            useClass: JwtSignerService,
        },
    ],
})
export class AuthModule { }