export class ClickEvent {
    public readonly id: string;
    public readonly shortLinkId: string;
    public readonly ip: string;
    public readonly userAgent: string;
    public readonly createdAt: Date;

    constructor(params: {
        id: string;
        shortLinkId: string;
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