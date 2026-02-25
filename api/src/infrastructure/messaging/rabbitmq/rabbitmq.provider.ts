import { Provider } from '@nestjs/common';
import amqp, { Channel } from 'amqplib';

export const RABBITMQ_CHANNEL = 'RABBITMQ_CHANNEL';

export const RabbitMQChannelProvider: Provider = {
    provide: RABBITMQ_CHANNEL,
    useFactory: async (): Promise<Channel> => {
        const DLX_EXCHANGE = `${process.env.RABBITMQ_QUEUE || 'click-events'}-dlx`;
        const connection = await amqp.connect( process.env.RABBITMQ_URL || 'amqp://localhost' );
        const channel = await connection.createChannel();
        await channel.assertQueue( process.env.RABBITMQ_QUEUE || 'click-events', { 
            durable: true,
            arguments: {
                'x-dead-letter-exchange': DLX_EXCHANGE,
                'x-dead-letter-routing-key': 'failed'
            }
        });
        return channel;
    },
};