import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { CACHE_REPOSITORY } from 'src/application/injection-tokens/cache-repository.token';
import { RedisCacheRepository } from 'src/infrastructure/repositories/redis/redis-cache.repository';


@Module({
    providers: [
        RedisService,
        {
          provide: CACHE_REPOSITORY,
          useClass: RedisCacheRepository,
        },
      ],
      exports: [RedisService, CACHE_REPOSITORY]
})
export class RedisModule { }