import { createClient, RedisClientType } from 'redis';

export class RedisService {
    private client: RedisClientType;

    constructor(url: string) {
        this.client = createClient({ url });
        this.client.on('error', (err) => console.error('Redis Client Error', err));
    }

    private async ensureConnected() {
        if (!this.client.isOpen) {
            await this.client.connect();
        }
    }

    async get(key: string): Promise<string | null> {
        await this.ensureConnected();
        return this.client.get(key);
    }

    async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
        await this.ensureConnected();
        if (ttlSeconds) {
            await this.client.set(key, value, { EX: ttlSeconds });
        } else {
            await this.client.set(key, value);
        }
    }

    async del(key: string): Promise<void> {
        await this.ensureConnected();
        await this.client.del(key);
    }
}