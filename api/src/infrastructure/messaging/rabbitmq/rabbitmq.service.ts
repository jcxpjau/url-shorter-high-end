import { connect, Connection, Channel } from 'amqplib';

export class RabbitMQService {
    private connection!: Connection;
    private channel!: Channel;

    constructor(
        private readonly url: string,
        private readonly clickEventQueue: string,
    ) { }

    async connect(): Promise<void> {
        this.connection = await connect(this.url);
        this.channel = await this.connection.createChannel();

        await this.channel.assertQueue(this.clickEventQueue, {
            durable: true,
        });
    }

    getChannel(): Channel {
        if (!this.channel) {
            throw new Error('RabbitMQ channel not initialized');
        }
        return this.channel;
    }

    async close(): Promise<void> {
        if (this.channel) await this.channel.close();
        if (this.connection) await this.connection.close();
    }
}