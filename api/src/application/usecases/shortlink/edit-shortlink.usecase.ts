import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

    async execute(id: number, userId: number, status: boolean): Promise<ShortLink> {
        const link = await this.shortLinkRepository.findById(id);

        if (!link) throw new NotFoundException('Short link not found');
        if (link.userId !== userId) throw new UnauthorizedException('Permission denied');

        await this.cacheRepository.del(`shortlink:${link.shortCode}`);
        const updatedLink = await this.shortLinkRepository.edit(id, status);

        const cacheKey = `shortlink:${updatedLink.shortCode}`;
    
        if (status === true) {
            await this.cacheRepository.set(
                cacheKey, 
                JSON.stringify({ id: updatedLink.id, url: updatedLink.originalUrl }), 
                60 * 60 * 24
            );
        } else {
            await this.cacheRepository.del(cacheKey);
        }
        return updatedLink;
    }
}