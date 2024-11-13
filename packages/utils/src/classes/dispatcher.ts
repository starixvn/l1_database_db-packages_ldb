import type { BaseLogger } from "@ldb/base-logger";
import type { StringKeyOf } from "../types/utils.js";
import { EventsDescription, TypedEventEmitter } from "./emitter.js";

export class Dispatcher<
    Events extends EventsDescription,
    PubEventDesc extends EventsDescription,
    Publisher extends TypedEventEmitter<PubEventDesc> = TypedEventEmitter<PubEventDesc>,
    PubEvent extends StringKeyOf<PubEventDesc> = StringKeyOf<PubEventDesc>,
> extends TypedEventEmitter<Events> {
    private readonly publishers: Set<Publisher> = new Set();

    constructor(protected readonly logger: BaseLogger) {
        super();
    }

    get className() {
        return this.constructor.name;
    }

    protected handleError(error: unknown, component: string) {
        this.logger.logError({ title: `${this.className}.${component}`, message: error });
    }

    subscribe<Event extends PubEvent>(publisher: Publisher, event: Event, listener: PubEventDesc[Event]): boolean {
        if (this.publishers.has(publisher)) {
            return false;
        }

        this.publishers.add(publisher);
        publisher.addListener<Event>(event, listener);
        return true;
    }

    unsubscribe<Event extends PubEvent>(publisher: Publisher, event: Event, listener: PubEventDesc[Event]): boolean {
        if (!this.publishers.has(publisher)) {
            return false;
        }

        publisher.removeListener<Event>(event, listener);
        this.publishers.delete(publisher);
        return true;
    }
}
