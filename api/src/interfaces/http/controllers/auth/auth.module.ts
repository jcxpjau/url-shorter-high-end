import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginUseCase } from '../../../../application/usecases/auth/login.usecase';
import { RegisterUserUseCase } from '../../../../application/usecases/auth/register-user.usecase';
import { PostgresUserRepository } from '../../../../infrastructure/repositories/postgres/postgres-user.repository';
import { PrismaService } from '../../../../infrastructure/database/postgres/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [
    PrismaService,
    PostgresUserRepository,
    LoginUseCase,
    RegisterUserUseCase,
  ],
})
export class AuthModule {}