import { Inject, Injectable } from '@nestjs/common';
import { CACHE_REPOSITORY } from 'src/application/injection-tokens/cache-repository.token';
import { CLICKEVENTS_REPOSITORY } from 'src/application/injection-tokens/click-events.token';
import { SHORTLINK_RESPOSITORY } from 'src/application/injection-tokens/short-link.token';
import type { CacheRepository } from 'src/domain/repositories/cache.repository';
import type { ClickEventRepository } from '../../../domain/repositories/click-event.repository';
import type { ShortLinkRepository } from '../../../domain/repositories/short-link.repository';

@Injectable()
export class RedirectUseCase {
    constructor(
        @Inject(SHORTLINK_RESPOSITORY)
        private readonly shortLinkRepository: ShortLinkRepository,
        @Inject(CLICKEVENTS_REPOSITORY)
        private readonly clickEventRepository: ClickEventRepository,
        @Inject(CACHE_REPOSITORY)
        private readonly cacheRepository: CacheRepository
    ) { }

    async execute(shortCode: string): Promise<string | null> {
        const cacheKey = `shortlink:${shortCode}`;
        const cachedUrl = await this.cacheRepository.get(cacheKey);
        if (cachedUrl) return cachedUrl;

        const shortLink = await this.shortLinkRepository.findByShortCode(shortCode);
        if (!shortLink) return null;

        await this.cacheRepository.set(cacheKey, shortLink.originalUrl, 60 * 60 * 24);
        return shortLink.originalUrl;
    }
}