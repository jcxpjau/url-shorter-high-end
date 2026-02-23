import { Inject, Injectable } from '@nestjs/common';
import type { ClickEventRepository } from '../../../domain/repositories/click-event.repository';
import type { ShortLinkRepository } from '../../../domain/repositories/short-link.repository';
import { GetLinkStatsInput } from '../../dto/links/get-link-stats.input';
import { GetLinkStatsOutput } from '../../dto/links/get-link-stats.output';
import { SHORTLINK_RESPOSITORY } from 'src/application/injection-tokens/short-link.token';
import { CLICKEVENTS_REPOSITORY } from 'src/application/injection-tokens/click-events.token';

@Injectable()
export class GetLinkStatsUseCase {
    constructor(
        @Inject( SHORTLINK_RESPOSITORY )
        private readonly shortLinkRepository: ShortLinkRepository,
        @Inject( CLICKEVENTS_REPOSITORY )
        private readonly clickEventRepository: ClickEventRepository,
    ) { }

    async execute(id: number, page: number, limit: number): Promise<GetLinkStatsOutput> {
        const link = await this.shortLinkRepository.findById(id);
        /*
        if (!link || link.userId !== input.userId) {
            throw new Error('Link not found');
        }*/

        const totalClicks = await this.clickEventRepository.countByShortLinkId(id);

        const eventsEntities = await this.clickEventRepository.findByShortLinkId(
            id,
            page,
            limit,
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