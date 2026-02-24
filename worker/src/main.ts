import 'dotenv/config';
import amqp from 'amqplib';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const QUEUE = 'click-events';

type ClickEventPayload = {
    shortLinkId: number;
    ip: string;
    userAgent: string;
    createdAt: string;
};

async function start() {
    if (!process.env.RABBITMQ_URL) {
        throw new Error('RABBITMQ_URL not defined');
    }

    const conn = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await conn.createChannel();

    const DLX_EXCHANGE = 'click-events-dlx';
    const DLQ_QUEUE = 'click-events-dead-letter';

    await channel.assertExchange(DLX_EXCHANGE, 'direct');
    await channel.assertQueue(DLQ_QUEUE, { durable: true });
    await channel.bindQueue(DLQ_QUEUE, DLX_EXCHANGE, 'failed');

    await channel.assertQueue(QUEUE, { 
        durable: true,
        arguments: {
            'x-dead-letter-exchange': DLX_EXCHANGE,
            'x-dead-letter-routing-key': 'failed'
        }
    });

    channel.prefetch(10);

    console.log(`🟢 Worker listening on queue: ${QUEUE}`);

    channel.consume(QUEUE, async msg => {
        if (!msg) return;

        try {
            const payload: ClickEventPayload = JSON.parse(
                msg.content.toString(),
            );
            await prisma.clickEventModel.create({
                data: {
                    shortLinkId: payload.shortLinkId,
                    ip: payload.ip,
                    userAgent: payload.userAgent,
                    createdAt: new Date(payload.createdAt),
                },
            });
            channel.ack(msg);
        } catch (error : any ) {
            const isFatalError = error instanceof SyntaxError || error.name === 'PrismaClientValidationError';
            channel.nack(msg, false, !isFatalError);
        }
    });

    const shutdown = async () => {
        console.log('\n🛑 Shutting down worker...');
        await channel.close();
        await conn.close();
        await prisma.$disconnect();
        process.exit(0);
    };
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
}


start().catch(err => {
    console.error("🔥 Fatal error starting worker:", err);
    process.exit(1);
});