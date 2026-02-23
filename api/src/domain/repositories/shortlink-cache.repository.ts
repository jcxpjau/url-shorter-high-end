export interface ShortLinkCacheRepository {
  getOriginalUrl(shortCode: string): Promise<string | null>;
  setOriginalUrl(shortCode: string, originalUrl: string): Promise<void>;
}