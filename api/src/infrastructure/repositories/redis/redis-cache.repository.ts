import { Injectable } from '@nestjs/common';
import { CacheRepository } from 'src/domain/repositories/cache.repository';
import { RedisService } from 'src/infrastructure/database/redis/redis.service';

@Injectable()
export class RedisCacheRepository implements CacheRepository {
    constructor(private readonly redisService: RedisService) {}

    async get(key: string): Promise<string | null> {
        return this.redisService.get(key);
    }

    async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
        await this.redisService.set(key, value, ttlSeconds);
    }

    async del(key: string): Promise<void> {
        await this.redisService.del(key);
    }
}