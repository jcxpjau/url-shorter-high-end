import amqp from 'amqplib';

export class ClickEventProducer {
    constructor(
        private readonly channel: amqp.Channel,
        private readonly queue: string,
    ) { }

    async publish(payload: {
        shortCode: string;
        ip: string;
        userAgent: string;
    }): Promise<void> {
        this.channel.sendToQueue(
            this.queue,
            Buffer.from(JSON.stringify(payload)),
            { persistent: true },
        );
    }
}