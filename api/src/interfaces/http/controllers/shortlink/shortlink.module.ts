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
import { CACHE_REPOSITORY } from 'src/application/injection-tokens/cache-repository.token';
import { RedisCacheRepository } from 'src/infrastructure/repositories/redis/redis-cache.repository';
import { RedisService } from 'src/infrastructure/database/redis/redis.service';
import { RedisModule } from 'src/infrastructure/database/redis/redis.module';

@Module({
    imports: [RedisModule],
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
        },
        {
            provide: CACHE_REPOSITORY,
            useExisting: RedisService,
        }
    ],
})
export class ShortLinkModule { }