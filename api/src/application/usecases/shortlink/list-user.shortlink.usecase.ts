import type { ShortLinkRepository } from '../../../domain/repositories/short-link.repository';
import { ShortLink } from '../../../domain/entities/short-link.entity';
import { Inject, Injectable } from '@nestjs/common';
import { SHORTLINK_RESPOSITORY } from 'src/application/injection-tokens/short-link.token';

interface ListUserShortLinksInput {
    userId: number;
}

@Injectable()
export class ListUserShortLinksUseCase {
    constructor(
        @Inject( SHORTLINK_RESPOSITORY )
        private readonly shortLinkRepository: ShortLinkRepository,
    ) { }

    async execute(input: ListUserShortLinksInput): Promise<ShortLink[]> {
        return this.shortLinkRepository.findByUserId(input.userId);
    }
}