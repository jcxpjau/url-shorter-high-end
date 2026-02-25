import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {

    private pool: Pool;

    constructor() {
        const poolInstance = new Pool({
            connectionString: process.env.DATABASE_URL || "...",
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        });
        const adapter = new PrismaPg(poolInstance);
        super({ adapter });
        this.pool = poolInstance;
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
        await this.pool.end();
    }
}