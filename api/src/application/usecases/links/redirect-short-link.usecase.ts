import { RedirectShortLinkInput } from '../../dto/links/redirect-short-link.input';
import { RedirectShortLinkOutput } from '../../dto/links/redirect-short-link.output';

export interface CacheReader {
    get(key: string): Promise<string | null>;
}

export interface ClickEventQueue {
    publish(event: {
        shortCode: string;
        ip: string;
        userAgent: string;
    }): Promise<void>;
}

export class RedirectShortLinkUseCase {
    constructor(
        private readonly cacheReader: CacheReader,
        private readonly clickEventQueue: ClickEventQueue,
    ) { }

    async execute(input: RedirectShortLinkInput): Promise<RedirectShortLinkOutput> {
        const originalUrl = await this.cacheReader.get(
            `short:${input.shortCode}`,
        );
        if (!originalUrl) {
            throw new Error('Short link not found');
        }
        this.clickEventQueue.publish({
            shortCode: input.shortCode,
            ip: input.ip,
            userAgent: input.userAgent,
        });
        return { originalUrl };
    }
}