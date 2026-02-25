import { Module } from '@nestjs/common';
import { CACHE_REPOSITORY } from 'src/application/injection-tokens/cache-repository.token';
import { SHORTLINK_RESPOSITORY } from 'src/application/injection-tokens/short-link.token';
import { SHORTCODE_GENERATOR } from 'src/application/injection-tokens/shortcode-generator.token';
import { ShortCodeGenerator } from 'src/application/service/shortcode-generator.service';
import { RedirectUseCase } from 'src/application/usecases/redirect/redirect.usecase';
import { RedisModule } from 'src/infrastructure/database/redis/redis.module';
import { RedisService } from 'src/infrastructure/database/redis/redis.service';
import { PostgresShortLinkRepository } from 'src/infrastructure/repositories/postgres/postgres-short-link.repository';
import { PrismaService } from '../../../../infrastructure/database/postgres/prisma.service';
import { RedirectController } from './redirect.controller';
import { CLICKEVENTS_REPOSITORY } from 'src/application/injection-tokens/click-events.token';
import { PostgresClickEventRepository } from 'src/infrastructure/repositories/postgres/postgres-click-event.repository';
import { CLICK_EVENT_QUEUE_REPOSITORY } from 'src/application/injection-tokens/click-event-queue.token';
import { ClickEventProducer } from 'src/infrastructure/messaging/rabbitmq/click-event.producer';
import { RabbitMQChannelProvider } from 'src/infrastructure/messaging/rabbitmq/rabbitmq.provider';

@Module({
    imports: [RedisModule],
    controllers: [RedirectController],
    providers: [
        PrismaService,
        RedirectUseCase,
        RabbitMQChannelProvider,
        {
            provide: SHORTLINK_RESPOSITORY,
            useClass: PostgresShortLinkRepository,
        },
        {
            provide: CLICKEVENTS_REPOSITORY,
            useClass: PostgresClickEventRepository,
        },
        {
            provide: CACHE_REPOSITORY,
            useExisting: RedisService,
        },
        {
            provide: CLICK_EVENT_QUEUE_REPOSITORY,
            useClass: ClickEventProducer,
        }
    ],
})
export class RedirectModule { }