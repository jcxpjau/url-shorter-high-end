import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import type { ShortLinkRepository } from '../../../domain/repositories/short-link.repository';
import { SHORTLINK_RESPOSITORY } from 'src/application/injection-tokens/short-link.token';

interface DeleteShortLinkInput {
    shortLinkId: number;
    userId?: number;
}

@Injectable()
export class DeleteShortLinkUseCase {
    constructor(
        @Inject(SHORTLINK_RESPOSITORY)
        private readonly shortLinkRepository: ShortLinkRepository,
    ) { }

    async execute(input: DeleteShortLinkInput): Promise<void> {
        const link = await this.shortLinkRepository.findById(input.shortLinkId);

        if (!link) {
            throw new NotFoundException('ShortLink not found');
        }

        if (link.userId !== input.userId) {
            //throw new UnauthorizedException('Unauthorized');
        }

        await this.shortLinkRepository.delete(input.shortLinkId);
    }
}