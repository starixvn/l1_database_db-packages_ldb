import EventEmitter from "events";
import type { IntelliString, StringKeyOf } from "../types/utils.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericListener = (...args: any[]) => void | Promise<void>;
export type CommonEvents = "newListener" | "removeListener";
export type EventsDescription = Record<string, GenericListener>;

export class TypedEventEmitter<Events extends EventsDescription, EventKeys extends StringKeyOf<Events> = StringKeyOf<Events>> extends EventEmitter {
    get className() {
        return this.constructor.name;
    }

    addListener<EventKey extends EventKeys>(event: EventKey, listener: Events[EventKey]): this;
    addListener<EventKey extends CommonEvents>(event: EventKey, listener: (eventName: string | symbol, listener: GenericListener) => void): this;
    addListener<EventKey extends string | symbol>(event: EventKey, listener: GenericListener): this;
    addListener<EventKey extends string | symbol>(event: EventKey, listener: GenericListener): this {
        return super.addListener(event, listener);
    }

    on<EventKey extends EventKeys>(event: EventKey, listener: Events[EventKey]): this;
    on<EventKey extends CommonEvents>(event: EventKey, listener: (eventName: string | symbol, listener: GenericListener) => void): this;
    on<EventKey extends string | symbol>(event: EventKey, listener: GenericListener): this;
    on<EventKey extends string | symbol>(event: EventKey, listener: GenericListener): this {
        return super.on(event, listener);
    }

    once<EventKey extends EventKeys>(event: EventKey, listener: Events[EventKey]): this;
    once<EventKey extends CommonEvents>(event: EventKey, listener: (eventName: string | symbol, listener: GenericListener) => void): this;
    once<EventKey extends string | symbol>(event: EventKey, listener: GenericListener): this;
    once<EventKey extends string | symbol>(event: EventKey, listener: GenericListener): this {
        return super.once(event, listener);
    }

    removeListener<EventKey extends EventKeys>(event: EventKey, listener: Events[EventKey]): this;
    removeListener<EventKey extends CommonEvents>(event: EventKey, listener: (eventName: string | symbol, listener: GenericListener) => void): this;
    removeListener<EventKey extends string | symbol>(event: EventKey, listener: GenericListener): this;
    removeListener<EventKey extends string | symbol>(event: EventKey, listener: GenericListener): this {
        return super.removeListener(event, listener);
    }

    off<EventKey extends EventKeys>(event: EventKey, listener: Events[EventKey]): this;
    off<EventKey extends CommonEvents>(event: EventKey, listener: (eventName: string | symbol, listener: GenericListener) => void): this;
    off<EventKey extends string | symbol>(event: EventKey, listener: GenericListener): this;
    off<EventKey extends string | symbol>(event: EventKey, listener: GenericListener): this {
        return super.off(event, listener);
    }

    removeAllListeners<EventKey extends EventKeys>(event?: IntelliString<EventKey | CommonEvents | symbol>): this {
        return super.removeAllListeners(event);
    }

    listeners<EventKey extends EventKeys>(event: EventKey | CommonEvents | symbol | string): Events[EventKey][] {
        return super.listeners(event) as Events[EventKey][];
    }

    rawListeners<EventKey extends EventKeys>(event: EventKey | CommonEvents | symbol | string): Events[EventKey][] {
        return super.rawListeners(event) as Events[EventKey][];
    }

    emit<EventKey extends EventKeys>(event: EventKey, ...args: Parameters<Events[EventKey]>): boolean;
    emit<EventKey extends CommonEvents>(event: EventKey, eventName: string | symbol, listener: GenericListener): boolean;
    emit<EventKey extends string | symbol>(event: EventKey, ...args: unknown[]): boolean;
    emit<EventKey extends string | symbol>(event: EventKey, ...args: unknown[]): boolean {
        return super.emit(event, ...args);
    }

    listenerCount<EventKey extends EventKeys>(type: EventKey | CommonEvents | symbol | string): number {
        return super.listenerCount(type);
    }

    prependListener<EventKey extends EventKeys>(event: EventKey, listener: Events[EventKey]): this;
    prependListener<EventKey extends CommonEvents>(event: EventKey, listener: (eventName: string | symbol, listener: GenericListener) => void): this;
    prependListener<EventKey extends string | symbol>(event: EventKey, listener: GenericListener): this;
    prependListener<EventKey extends string | symbol>(event: EventKey, listener: GenericListener): this {
        return super.prependListener(event, listener);
    }

    prependOnceListener<EventKey extends EventKeys>(event: EventKey, listener: Events[EventKey]): this;
    prependOnceListener<EventKey extends CommonEvents>(event: EventKey, listener: (eventName: string | symbol, listener: GenericListener) => void): this;
    prependOnceListener<EventKey extends string | symbol>(event: EventKey, listener: GenericListener): this;
    prependOnceListener<EventKey extends string | symbol>(event: EventKey, listener: GenericListener): this {
        return super.prependOnceListener(event, listener);
    }

    eventNames(): (string | symbol)[] {
        return super.eventNames();
    }
    getMaxListeners(): number {
        return super.getMaxListeners();
    }
    setMaxListeners(n: number): this {
        return super.setMaxListeners(n);
    }
}
