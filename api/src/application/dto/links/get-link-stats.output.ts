export interface GetLinkStatsOutput {
    totalClicks: number;
    events: {
      id: number;
      shortLinkId: number;
      ip: string;
      userAgent: string;
      createdAt: Date;
    }[];
  }