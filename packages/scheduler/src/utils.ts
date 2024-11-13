import type { TimerConfig } from "./types.js";

export const getDelayMs = (config: TimerConfig) => {
    const [msPeriod, msOffset] = config;
    const nextScheduleTimeout: number = (Math.floor((Date.now() - msOffset) / msPeriod) + 1) * msPeriod + msOffset;
    return nextScheduleTimeout - Date.now();
};

export const throwError = (event: string, errorMessage: string) => {
    throw new Error(`@${event} - ${errorMessage}`);
};
