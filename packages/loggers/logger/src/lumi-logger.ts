import type { SeverityLevel } from "@ldb/base-logger";
import { SentryLogger, type NodeOptions, type SentryOptions } from "@ldb/sentry-logger";
import { SkynexLogger, type SkynexOptions } from "@ldb/skynex-logger";
import { TerminalLogger } from "@ldb/terminal-logger";
import { Logger } from "./logger.js";

export type LumiLoggerConfig = {
    terminalSeverityLevel?: SeverityLevel;

    sentrySeverityLevel?: SeverityLevel;
    sentryNodeOptions: NodeOptions;
    sentryOptions?: SentryOptions;

    skynexSeverityLevel?: SeverityLevel;
    skynexOptions: SkynexOptions;
    environment: string;
};

export class LumiLogger extends Logger {
    constructor(lumiLoggerConfig: LumiLoggerConfig) {
        const {
            terminalSeverityLevel = "log",
            sentrySeverityLevel = "warning",
            sentryNodeOptions,
            sentryOptions = {},
            skynexSeverityLevel = "warning",
            skynexOptions,
            environment,
        } = lumiLoggerConfig;

        const terminalLogger = new TerminalLogger(terminalSeverityLevel);
        const sentryLogger = new SentryLogger(sentryNodeOptions, sentryOptions, sentrySeverityLevel);
        const skynexLogger = new SkynexLogger(skynexOptions, skynexSeverityLevel, environment);

        super(terminalLogger, skynexLogger, sentryLogger);
    }
}
