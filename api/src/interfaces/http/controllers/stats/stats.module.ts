import { ClickEventRepository } from './../../../../domain/repositories/click-event.repository';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/postgres/prisma.service';
import { StatsController } from './stats.controller';
import { CLICKEVENTS_REPOSITORY } from 'src/application/injection-tokens/click-events.token';
import { PostgresClickEventRepository } from 'src/infrastructure/repositories/postgres/postgres-click-event.repository';
import { SHORTLINK_RESPOSITORY } from 'src/application/injection-tokens/short-link.token';
import { PostgresShortLinkRepository } from 'src/infrastructure/repositories/postgres/postgres-short-link.repository';
import { GetLinkStatsUseCase } from 'src/application/usecases/click-events/get-link-stats.usecase';


@Module({
    controllers: [StatsController],
    providers: [
        PrismaService,
        GetLinkStatsUseCase,
        {
            provide: SHORTLINK_RESPOSITORY,
            useClass: PostgresShortLinkRepository,
        },
        {
            provide: CLICKEVENTS_REPOSITORY,
            useClass: PostgresClickEventRepository,
        }
    ],
})
export class StatsModule { }