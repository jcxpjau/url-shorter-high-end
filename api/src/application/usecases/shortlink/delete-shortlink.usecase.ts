import { ShortLinkRepository } from '../../../domain/repositories/short-link.repository';

interface DeleteShortLinkInput {
    shortLinkId: string;
    userId: string;
}

export class DeleteShortLinkUseCase {
    constructor(
        private readonly shortLinkRepository: ShortLinkRepository,
    ) { }

    async execute(input: DeleteShortLinkInput): Promise<void> {
        const link = await this.shortLinkRepository.findById(input.shortLinkId);

        if (!link) {
            throw new Error('ShortLink not found');
        }

        if (link.userId !== input.userId) {
            throw new Error('Unauthorized');
        }

        await this.shortLinkRepository.delete(input.shortLinkId);
    }
}