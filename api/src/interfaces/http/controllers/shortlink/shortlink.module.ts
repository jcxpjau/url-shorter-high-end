import { Module } from '@nestjs/common';
import { LoginUseCase } from '../../../../application/usecases/auth/login.usecase';
import { RegisterUserUseCase } from '../../../../application/usecases/auth/register-user.usecase';
import { PostgresUserRepository } from '../../../../infrastructure/repositories/postgres/postgres-user.repository';
import { PrismaService } from '../../../../infrastructure/database/postgres/prisma.service';
import { PostgresShortLinkRepository } from 'src/infrastructure/repositories/postgres/postgres-short-link.repository';
import { CreateShortLinkUseCase } from 'src/application/usecases/shortlink/create-shortlink.usecase';
import { DeleteShortLinkUseCase } from 'src/application/usecases/shortlink/delete-shortlink.usecase';
import { ListUserShortLinksUseCase } from 'src/application/usecases/shortlink/list-user.shortlink.usecase';
import { RedirectShortLinkUseCase } from 'src/application/usecases/links/redirect-short-link.usecase';
import { ShortLinkController } from './shortlink.controller';

@Module({
  controllers: [ShortLinkController],
  providers: [
    PrismaService,
    PostgresShortLinkRepository,
    CreateShortLinkUseCase,
    DeleteShortLinkUseCase,
    ListUserShortLinksUseCase,
    RedirectShortLinkUseCase
  ],
})
export class ShortLinkModule {}