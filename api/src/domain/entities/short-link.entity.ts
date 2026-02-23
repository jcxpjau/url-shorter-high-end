import { randomUUID } from 'crypto';

export class ShortLink {
    public readonly id?: number;
    public readonly userId: number;
    public readonly originalUrl: string;
    public readonly shortCode: string;
    public readonly createdAt: Date;
    public readonly isActive: boolean;

    private constructor(params: {
        id?: number;
        userId: number;
        originalUrl: string;
        shortCode: string;
        createdAt: Date;
        isActive: boolean;
    }) {
        this.id = params.id;
        this.userId = params.userId;
        this.originalUrl = params.originalUrl;
        this.shortCode = params.shortCode;
        this.createdAt = params.createdAt;
        this.isActive = params.isActive;
    }

    static create(params: {
        userId: number;
        originalUrl: string;
        shortCode: string;
    }): ShortLink {
        return new ShortLink({
            userId: params.userId,
            originalUrl: params.originalUrl,
            shortCode: params.shortCode,
            createdAt: new Date(),
            isActive: true,
        });
    }

    static restore(params: {
        id: number;
        userId: number;
        originalUrl: string;
        shortCode: string;
        createdAt: Date;
        isActive: boolean;
    }): ShortLink {
        return new ShortLink(params);
    }
}