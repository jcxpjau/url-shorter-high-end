import { ShortLinkRepository } from '../../../domain/repositories/short-link.repository';
import { ShortLink } from '../../../domain/entities/short-link.entity';

interface ListUserShortLinksInput {
    userId: string;
}

export class ListUserShortLinksUseCase {
    constructor(
        private readonly shortLinkRepository: ShortLinkRepository,
    ) { }

    async execute(input: ListUserShortLinksInput): Promise<ShortLink[]> {
        return this.shortLinkRepository.findByUserId(input.userId);
    }
}