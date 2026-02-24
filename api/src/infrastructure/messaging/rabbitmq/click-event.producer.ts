import amqp from 'amqplib';
import { ClickEventQueueRepository } from '../../../domain/repositories/click-event-queue.repository';
import { ClickEvent } from '../../../domain/entities/click-event.entity';
import { Inject, Injectable } from '@nestjs/common';
import { RABBITMQ_CHANNEL } from './rabbitmq.provider';
import { Channel } from 'amqplib';

@Injectable()
export class ClickEventProducer implements ClickEventQueueRepository {
    constructor(
        @Inject(RABBITMQ_CHANNEL) private readonly channel: Channel,
    ) {}

    private readonly queue = 'click-events';

    async publish(event: ClickEvent): Promise<void> {
        const message = Buffer.from(JSON.stringify(event));
        try {
            await new Promise<void>((resolve, reject) => {
                this.channel.sendToQueue(
                    this.queue,
                    message,
                    { persistent: true },
                    (err, ok) => {
                        if (err) return reject(err);
                        resolve();
                    }
                );
            });
        } catch (error) {
            console.error('Erro ao garantir entrega da mensagem:', error);
            throw error; 
        }
    }
}