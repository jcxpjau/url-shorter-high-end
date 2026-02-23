import { ShortLink } from '../entities/short-link.entity';

export interface ShortLinkRepository {
  findById(id: number): Promise<ShortLink | null>;
  findByShortCode(shortCode: string): Promise<ShortLink | null>;
  findByUserId(userId: number): Promise<ShortLink[]>;
  edit( id: number, status: boolean ) : Promise<ShortLink>;
  existsByShortCode(shortCode: string): Promise<boolean>;
  save(link: ShortLink): Promise<ShortLink>;
  existsByShortCode(shortCode: string): Promise<boolean>;
  delete(id: number): Promise<void>;
}