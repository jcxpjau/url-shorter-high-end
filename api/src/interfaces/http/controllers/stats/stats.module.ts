import { Module } from '@nestjs/common';
import { CLICKEVENTS_REPOSITORY } from 'src/application/injection-tokens/click-events.token';
import { SHORTLINK_RESPOSITORY } from 'src/application/injection-tokens/short-link.token';
import { GetLinkStatsUseCase } from 'src/application/usecases/click-events/get-link-stats.usecase';
import { PrismaService } from 'src/infrastructure/database/postgres/prisma.service';
import { PostgresClickEventRepository } from 'src/infrastructure/repositories/postgres/postgres-click-event.repository';
import { PostgresShortLinkRepository } from 'src/infrastructure/repositories/postgres/postgres-short-link.repository';
import { StatsController } from './stats.controller';


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