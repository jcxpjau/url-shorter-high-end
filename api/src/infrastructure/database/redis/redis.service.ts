import { createClient, RedisClientType } from 'redis';

export class RedisService {
    private client: RedisClientType;

    constructor(url: string) {
        this.client = createClient({ url });
        this.client.on('error', (err) => console.error('Redis Client Error', err));
        this.client.connect().catch(err => console.error('Erro ao conectar Redis', err));
    }

    async get(key: string): Promise<string | null> {
        return this.client.get(key);
    }

    async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
        if (ttlSeconds) {
            await this.client.set(key, value, { EX: ttlSeconds });
        } else {
            await this.client.set(key, value);
        }
    }

    async del(key: string): Promise<void> {
        await this.client.del(key);
    }
}