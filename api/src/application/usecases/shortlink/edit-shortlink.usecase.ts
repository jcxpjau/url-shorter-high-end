import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SHORTLINK_RESPOSITORY } from 'src/application/injection-tokens/short-link.token';
import { ShortLink } from '../../../domain/entities/short-link.entity';
import type { ShortLinkRepository } from '../../../domain/repositories/short-link.repository';
import { CACHE_REPOSITORY } from 'src/application/injection-tokens/cache-repository.token';
import type { CacheRepository } from 'src/domain/repositories/cache.repository';

@Injectable()
export class EditShortLinkUseCase {
    constructor(
        @Inject(SHORTLINK_RESPOSITORY)
        private readonly shortLinkRepository: ShortLinkRepository,
        @Inject(CACHE_REPOSITORY)
        private readonly cacheRepository: CacheRepository
    ) { }

    async execute(id: number, status: boolean): Promise<ShortLink> {
        try {
            const link = await this.shortLinkRepository.edit(id, status);
            if (status) {
                await this.cacheRepository.set(`shortlink:${link.shortCode}`, link.originalUrl, 60 * 60 * 24);
            } else {
                await this.cacheRepository.del(`shortlink:${link.shortCode}`);
            }
            return link;
        } catch (error) {
            throw new NotFoundException('Short link not found');
        }
    }
}