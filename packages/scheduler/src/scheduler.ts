import { TypedEventEmitter } from "@ldb/utils";
import type { SchedulerEventDescription, TimerConfig } from "./types.js";
import { getDelayMs, throwError } from "./utils.js";

export class Scheduler<ScheduleKey extends string> extends TypedEventEmitter<SchedulerEventDescription<Scheduler<ScheduleKey>>> {
    static FIRE = Symbol("FIRE");
    private configs: Map<ScheduleKey, TimerConfig> = new Map();
    private timeouts: Map<ScheduleKey, NodeJS.Timeout> = new Map();

    constructor(schedulerConfig: Record<ScheduleKey, TimerConfig>) {
        super();
        this.selfBound();
        this.configure(schedulerConfig);
    }

    private selfBound() {
        this.fire = this.fire.bind(this);
    }

    private configure(schedulerConfig: Record<ScheduleKey, TimerConfig>) {
        for (const event in schedulerConfig) {
            if (!Object.hasOwn(schedulerConfig, event)) {
                continue;
            }

            const config = schedulerConfig[`${event}` as ScheduleKey];
            this.configs.set(event, config);
            this.schedule(event, config);
        }
    }

    private schedule<Event extends ScheduleKey>(event: Event, config: TimerConfig) {
        this.abort(event);

        const delayMs = getDelayMs(config);
        this.timeouts.set(event, setTimeout(this.fire, delayMs, event));
    }

    abort<Event extends ScheduleKey>(event: Event) {
        const lastTimeout = this.timeouts.get(event);
        clearTimeout(lastTimeout);
    }

    private fire<Event extends ScheduleKey>(event: Event) {
        this.emit(event);
        this.emit(Scheduler.FIRE, event);

        const config = this.configs.get(event) ?? throwError(event, "No config saved for this event");
        this.schedule(event, config);
    }
}
