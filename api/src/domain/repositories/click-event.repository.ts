import { ClickEvent } from '../entities/click-event.entity';

export interface ClickEventRepository {
  countByShortLinkId(shortLinkId: string): Promise<number>;
  findByShortLinkId(
    shortLinkId: string,
    page: number,
    limit: number,
  ): Promise<ClickEvent[]>;

  save(event: ClickEvent): Promise<void>;
}