import { Module } from '@nestjs/common';
import { SHORTLINK_RESPOSITORY } from 'src/application/injection-tokens/short-link.token';
import { SHORTCODE_GENERATOR } from 'src/application/injection-tokens/shortcode-generator.token';
import { ShortCodeGenerator } from 'src/application/service/shortcode-generator.service';
import { CreateShortLinkUseCase } from 'src/application/usecases/shortlink/create-shortlink.usecase';
import { DeleteShortLinkUseCase } from 'src/application/usecases/shortlink/delete-shortlink.usecase';
import { ListUserShortLinksUseCase } from 'src/application/usecases/shortlink/list-user.shortlink.usecase';
import { PostgresShortLinkRepository } from 'src/infrastructure/repositories/postgres/postgres-short-link.repository';
import { PrismaService } from '../../../../infrastructure/database/postgres/prisma.service';
import { ShortLinkController } from './shortlink.controller';
import { EditShortLinkUseCase } from 'src/application/usecases/shortlink/edit-shortlink.usecase';

@Module({
  controllers: [ShortLinkController],
  providers: [
    PrismaService,
    CreateShortLinkUseCase,
    EditShortLinkUseCase,
    DeleteShortLinkUseCase,
    ListUserShortLinksUseCase,
    {
      provide: SHORTLINK_RESPOSITORY,
      useClass: PostgresShortLinkRepository,
    },
    {
      provide: SHORTCODE_GENERATOR,
      useClass: ShortCodeGenerator,
  }
  ],
})
export class ShortLinkModule { }