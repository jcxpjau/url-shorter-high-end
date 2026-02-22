import { createClient, RedisClientType } from 'redis';

export class RedisService {
    private client: RedisClientType;

    constructor(url: string) {
        this.client = createClient({ url });
    }

    async connect() {
        await this.client.connect();
    }

    async get(key: string): Promise<string | null> {
        return this.client.get(key);
    }

    async set(key: string, value: string): Promise<void> {
        await this.client.set(key, value);
    }
}