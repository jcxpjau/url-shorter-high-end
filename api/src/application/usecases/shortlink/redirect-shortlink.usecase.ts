import { ShortLinkCacheRepository } from '../../../domain/repositories/shortlink-cache.repository';
import { ClickEventQueue } from '../queues/click-event.queue';

interface RedirectShortLinkInput {
    shortCode: string;
    ip: string;
    userAgent: string;
}

export class RedirectShortLinkUseCase {
    constructor(
        private readonly cache: ShortLinkCacheRepository,
        private readonly clickQueue: ClickEventQueue,
    ) { }

    async execute(input: RedirectShortLinkInput): Promise<string> {
        const originalUrl = await this.cache.getOriginalUrl(input.shortCode);

        if (!originalUrl) {
            throw new Error('Short link not found');
        }

        await this.clickQueue.publish({
            shortCode: input.shortCode,
            ip: input.ip,
            userAgent: input.userAgent,
        });

        return originalUrl;
    }
}