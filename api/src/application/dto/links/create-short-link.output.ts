export interface CreateShortLinkOutput {
    id: string;
    userId: string;
    originalUrl: string;
    shortCode: string;
    createdAt: Date;
    isActive: boolean;
  }