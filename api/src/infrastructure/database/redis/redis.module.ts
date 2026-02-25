import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { CACHE_REPOSITORY } from 'src/application/injection-tokens/cache-repository.token';
import { RedisCacheRepository } from 'src/infrastructure/repositories/redis/redis-cache.repository';
import { ConfigService } from '@nestjs/config';


@Module({
  providers: [
    {
      provide: RedisService,
      useFactory: (config: ConfigService) => {
        const redisUrl = config.get<string>('REDIS_URL') || "redis://redis:6379";
        return new RedisService( redisUrl );
      },
      inject: [ConfigService]
    },
    {
      provide: CACHE_REPOSITORY,
      useClass: RedisCacheRepository,
    },
  ],
  exports: [RedisService, CACHE_REPOSITORY]
})
export class RedisModule { }