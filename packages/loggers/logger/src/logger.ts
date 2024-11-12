import { type AdditionalContent, BaseLogger, type MessageContent, type SeverityLevel } from "@ldb/base-logger";
import type { SentryLogger, SentryOptions } from "@ldb/sentry-logger";
import type { SkynexLogger } from "@ldb/skynex-logger";
import type { TerminalLogger, TerminalOptions } from "@ldb/terminal-logger";

export type CompositeOptions = {
    sentry?: SentryOptions;
    terminal?: TerminalOptions;
};

export class Logger extends BaseLogger<CompositeOptions> {
    constructor(
        private terminalLogger?: TerminalLogger,
        private skynexLogger?: SkynexLogger,
        private sentryLogger?: SentryLogger,
        private otherLoggers?: Set<BaseLogger>,
    ) {
        super("debug");
    }

    protected doLog(severity: SeverityLevel, content: MessageContent, additional?: AdditionalContent, options: CompositeOptions = {}) {
        const { sentry, terminal } = options;
        if (this.terminalLogger) {
            try {
                this.terminalLogger.log(severity, content, additional, terminal);
            } catch {
                //
            }
        }
        if (this.skynexLogger) {
            try {
                this.skynexLogger.log(severity, content, additional);
            } catch {
                //
            }
        }
        if (this.sentryLogger) {
            try {
                this.sentryLogger.log(severity, content, additional, sentry);
            } catch {
                //
            }
        }
        if (this.otherLoggers) {
            for (const logger of this.otherLoggers) {
                try {
                    logger.log(severity, content, additional);
                } catch {
                    //
                }
            }
        }
    }
}
