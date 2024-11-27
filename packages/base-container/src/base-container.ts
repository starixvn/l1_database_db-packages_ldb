import { HealthcheckServer } from "@ldb/healthcheck";
import { LumiLogger, TerminalLogger, type LumiLoggerConfig } from "@ldb/logger";
import { Scheduler, type TimerConfig } from "@ldb/scheduler";
import { type Metadata } from "@ldb/utils";
import { asClass, asValue, createContainer, InjectionMode, type AwilixContainer, type ResolveOptions } from "awilix";

export class BaseContainer {
    protected readonly container: AwilixContainer;

    constructor() {
        this.container = createContainer({ injectionMode: InjectionMode.CLASSIC });
        this.registerDefault();
    }

    private registerDefault() {
        this.container.register({
            logger: asValue(new TerminalLogger("debug")),
        });
        return this;
    }

    protected registerLogger(lumiLoggerConfig: LumiLoggerConfig) {
        this.container.register({
            logger: asClass(LumiLogger).singleton(),
            lumiLoggerConfig: asValue(lumiLoggerConfig),
        });
        return this;
    }

    protected registerHealthcheck(metadata: Metadata, healthcheckPort: number) {
        this.container.register({
            healthcheckServer: asClass(HealthcheckServer).singleton(),
            metadata: asValue(metadata),
            healthcheckPort: asValue(healthcheckPort),
        });
        return this;
    }

    protected registerScheduler(schedulerConfig: Record<string, TimerConfig>) {
        this.container.register({
            scheduler: asClass(Scheduler).singleton(),
            schedulerConfig: asValue(schedulerConfig),
        });
        return this;
    }

    resolve<N extends string>(name: N, resolveOptions?: ResolveOptions) {
        return this.container.resolve(name, resolveOptions);
    }
}
