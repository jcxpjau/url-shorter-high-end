import { ShortLink } from '../entities/short-link.entity';

export interface ShortLinkRepository {
  findById(id: string): Promise<ShortLink | null>;
  findByShortCode(shortCode: string): Promise<ShortLink | null>;
  findByUserId(userId: string): Promise<ShortLink[]>;
  existsByShortCode(shortCode: string): Promise<boolean>;
  save(link: ShortLink): Promise<void>;
  existsByShortCode(shortCode: string): Promise<boolean>;
  delete(id: string): Promise<void>;
}