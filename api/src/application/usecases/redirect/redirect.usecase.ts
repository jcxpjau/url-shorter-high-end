import { Inject, Injectable } from '@nestjs/common';
import { CACHE_REPOSITORY } from 'src/application/injection-tokens/cache-repository.token';
import { CLICK_EVENT_QUEUE_REPOSITORY } from 'src/application/injection-tokens/click-event-queue.token';
import { SHORTLINK_RESPOSITORY } from 'src/application/injection-tokens/short-link.token';
import type { CacheRepository } from 'src/domain/repositories/cache.repository';
import type { ClickEventQueueRepository } from 'src/domain/repositories/click-event-queue.repository';
import type { ShortLinkRepository } from '../../../domain/repositories/short-link.repository';
import { logger } from 'src/shared/logger/pino.logger.service';

@Injectable()
export class RedirectUseCase {
    constructor(
        @Inject(SHORTLINK_RESPOSITORY)
        private readonly shortLinkRepository: ShortLinkRepository,
        @Inject(CACHE_REPOSITORY)
        private readonly cacheRepository: CacheRepository,
        @Inject( CLICK_EVENT_QUEUE_REPOSITORY )
        private readonly clickEventQueueRepository: ClickEventQueueRepository
    ) { }

    async execute(shortCode: string, agent: string, ip: string): Promise<string | null> {
        const cacheKey = `shortlink:${shortCode}`;
        const cachedData = await this.cacheRepository.get(cacheKey);
        let originalUrl: string | null = null;
        let shortLinkId: number | undefined;

        if (cachedData) {
            const parsed = JSON.parse(cachedData);
            originalUrl = parsed.url;
            shortLinkId = parsed.id;
        } else {
            const shortLink = await this.shortLinkRepository.findByShortCode(shortCode);
            
            if (!shortLink || shortLink.isActive === false) {
                return null;
            }

            originalUrl = shortLink.originalUrl;
            shortLinkId = shortLink.id;

            const dataToCache = JSON.stringify({ id: shortLinkId, url: originalUrl });
            this.cacheRepository.set(cacheKey, dataToCache, 60 * 60 * 24)
                .catch(err => logger.error({ err }, 'Erro ao atualizar cache no Redirect'));
        }
        if (shortLinkId) {
            this.clickEventQueueRepository.publish({
                shortLinkId,
                ip,
                userAgent: agent,
                createdAt: new Date(),
            }).catch(err => logger.error({ err }, 'Erro ao publicar na fila de cliques'));
        }

        return originalUrl;
    }
}