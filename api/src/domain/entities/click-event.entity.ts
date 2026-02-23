export class ClickEvent {
    public readonly id?: number;
    public readonly shortLinkId: number;
    public readonly ip: string;
    public readonly userAgent: string;
    public readonly createdAt: Date;

    constructor(params: {
        id?: number;
        shortLinkId: number;
        ip: string;
        userAgent: string;
        createdAt: Date;
    }) {
        this.id = params.id;
        this.shortLinkId = params.shortLinkId;
        this.ip = params.ip;
        this.userAgent = params.userAgent;
        this.createdAt = params.createdAt;
    }
}