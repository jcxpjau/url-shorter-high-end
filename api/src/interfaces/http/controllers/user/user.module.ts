import { Module } from '@nestjs/common';
import { DeleteUserUseCase } from 'src/application/usecases/users/delete-user.usecase';
import { GetUserUseCase } from 'src/application/usecases/users/get-user.usecase';
import { PrismaService } from '../../../../infrastructure/database/postgres/prisma.service';
import { PostgresUserRepository } from '../../../../infrastructure/repositories/postgres/postgres-user.repository';
import { UserController } from './user.controller';
import { USER_REPOSITORY } from 'src/application/injection-tokens/user-repository.token';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    DeleteUserUseCase,
    GetUserUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: PostgresUserRepository,
    }
  ],
})
export class UserModule { }