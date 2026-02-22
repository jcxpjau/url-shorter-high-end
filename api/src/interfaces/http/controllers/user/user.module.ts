import { Module } from '@nestjs/common';
import { DeleteUserUseCase } from 'src/application/usecases/users/delete-user.usecase';
import { GetUserUseCase } from 'src/application/usecases/users/get-user.usecase';
import { PrismaService } from '../../../../infrastructure/database/postgres/prisma.service';
import { PostgresUserRepository } from '../../../../infrastructure/repositories/postgres/postgres-user.repository';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    PostgresUserRepository,
    DeleteUserUseCase,
    GetUserUseCase,
  ],
})
export class UserModule {}