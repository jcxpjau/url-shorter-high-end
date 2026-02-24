import { ClickEvent } from "../entities/click-event.entity";

export interface ClickEventQueueRepository {
    publish(event: ClickEvent)
}