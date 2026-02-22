export interface ClickEventQueue {
    publish(event: {
        shortCode: string;
        ip: string;
        userAgent: string;
    }): Promise<void>;
}