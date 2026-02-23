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

        const eventsEntities = await this.clickEventRepository.findByShortLinkId(
            input.shortLinkId,
            input.page,
            input.limit,
        );

        const events = eventsEntities.map(event => ({
            id: event.id!,
            shortLinkId: event.shortLinkId,
            ip: event.ip,
            userAgent: event.userAgent,
            createdAt: event.createdAt,
        }));

        return { totalClicks, events };
    }
}