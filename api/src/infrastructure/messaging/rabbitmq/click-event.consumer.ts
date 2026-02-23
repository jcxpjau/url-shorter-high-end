import amqp from 'amqplib';
import { ClickEvent } from '../../../domain/entities/click-event.entity';
import { ClickEventRepository } from '../../../domain/repositories/click-event.repository';
import { ShortLinkRepository } from '../../../domain/repositories/short-link.repository';

export class ClickEventConsumer {
    constructor(
        private readonly channel: amqp.Channel,
        private readonly queue: string,
        private readonly shortLinkRepository: ShortLinkRepository,
        private readonly clickEventRepository: ClickEventRepository,
    ) { }

    async start() {
        await this.channel.consume(this.queue, async msg => {
            if (!msg) return;

            const payload = JSON.parse(msg.content.toString());

            const link = await this.shortLinkRepository.findByShortCode(
                payload.shortCode,
            );

            if (!link) {
                this.channel.ack(msg);
                return;
            }

            const event = new ClickEvent({
                shortLinkId: link.id!,
                ip: payload.ip,
                userAgent: payload.userAgent,
                createdAt: new Date(),
            });

            await this.clickEventRepository.save(event);

            this.channel.ack(msg);
        });
    }
}