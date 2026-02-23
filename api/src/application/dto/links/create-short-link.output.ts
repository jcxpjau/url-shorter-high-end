export interface CreateShortLinkOutput {
    id?: number;
    userId: number;
    originalUrl: string;
    shortCode: string;
    createdAt: Date;
    isActive: boolean;
  }