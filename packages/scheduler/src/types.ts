import type { Scheduler } from "./scheduler.js";

export type FireListener = () => void;

type Period$ms = number & {};
type Offset$ms = number & {};
/** Tuple of 2 numbers that contains [period, offset] value in milliseconds */
export type TimerConfig = [Period$ms, Offset$ms];

export type SchedulerEventDescription<T> = T extends Scheduler<infer S> ? Record<S, FireListener> : T extends Record<infer S, TimerConfig> ? Record<S, FireListener> : never;
