import { ClickEvent } from '../entities/click-event.entity';

export interface ClickEventRepository {
  countByShortLinkId(shortLinkId: number): Promise<number>;
  findByShortLinkId(
    shortLinkId: number,
    page: number,
    limit: number,
  ): Promise<ClickEvent[]>;

  save(event: ClickEvent): Promise<void>;
}