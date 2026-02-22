import { ClickEventRepository } from '../../../domain/repositories/click-event.repository';
import { ShortLinkRepository } from '../../../domain/repositories/short-link.repository';
import { GetLinkStatsInput } from '../../dto/links/get-link-stats.input';
import { GetLinkStatsOutput } from '../../dto/links/get-link-stats.output';

export class GetLinkStatsUseCase {
    constructor(
        private readonly shortLinkRepository: ShortLinkRepository,
        private readonly clickEventRepository: ClickEventRepository,
    ) { }

    async execute(input: GetLinkStatsInput): Promise<GetLinkStatsOutput> {
        const link = await this.shortLinkRepository.findById(input.shortLinkId);
        if (!link || link.userId !== input.userId) {
            throw new Error('Link not found');
        }

        const totalClicks = await this.clickEventRepository.countByShortLinkId(
            input.shortLinkId,
        );

        const events = await this.clickEventRepository.findByShortLinkId(
            input.shortLinkId,
            input.page,
            input.limit,
        );

        return { totalClicks, events };
    }
}