import { ShortLinkRepository } from '../../../domain/repositories/short-link.repository';
import { ListUserLinksOutput } from '../../dto/links/list-user-links.output';

export class ListUserLinksUseCase {
    constructor(private readonly shortLinkRepository: ShortLinkRepository) { }

    async execute(userId: string): Promise<ListUserLinksOutput[]> {
        const links = await this.shortLinkRepository.findByUserId(userId);

        return links.map(link => ({ ...link }));
    }
}