import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CACHE_REPOSITORY } from 'src/application/injection-tokens/cache-repository.token';
import { SHORTLINK_RESPOSITORY } from 'src/application/injection-tokens/short-link.token';
import type { CacheRepository } from 'src/domain/repositories/cache.repository';
import type { ShortLinkRepository } from '../../../domain/repositories/short-link.repository';

interface DeleteShortLinkInput {
    shortLinkId: number;
    userId?: number;
}

@Injectable()
export class DeleteShortLinkUseCase {
    constructor(
        @Inject(SHORTLINK_RESPOSITORY)
        private readonly shortLinkRepository: ShortLinkRepository,
        @Inject(CACHE_REPOSITORY)
        private readonly cacheRepository: CacheRepository
    ) { }

    async execute(input: DeleteShortLinkInput): Promise<void> {
        const link = await this.shortLinkRepository.findById(input.shortLinkId);

        if (!link) {
            throw new NotFoundException('ShortLink not found');
        }

        if (link.userId !== input.userId) {
            throw new UnauthorizedException('Unauthorized');
        }

        await this.cacheRepository.del(`shortlink:${link.shortCode}`);

        await this.shortLinkRepository.delete(input.shortLinkId);
    }
}