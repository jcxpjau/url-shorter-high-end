export interface GetLinkStatsOutput {
    totalClicks: number;
    events: {
      id: string;
      shortLinkId: string;
      ip: string;
      userAgent: string;
      createdAt: Date;
    }[];
  }