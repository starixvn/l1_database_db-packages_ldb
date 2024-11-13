import type { Dispatcher } from "../classes/dispatcher.js";
import type { EventsDescription, TypedEventEmitter } from "../classes/emitter.js";

export type DescriptionOf<T> = T extends TypedEventEmitter<infer ED> ? ED : T extends Dispatcher<infer ED, EventsDescription> ? ED : never;
