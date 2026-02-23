export interface ListUserLinksOutput {
    id?: number;
    userId: number;
    originalUrl: string;
    shortCode: string;
    createdAt: Date;
    isActive: boolean;
  }