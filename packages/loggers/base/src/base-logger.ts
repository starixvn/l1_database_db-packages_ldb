import type { Extras, SeverityLevel as _SeverityLevel } from "@sentry/types";

export type SeverityLevel = Exclude<_SeverityLevel, "critical">;
export type { Extras };

const SeverityOrdinal = {
    debug: -1,
    info: 0,
    log: 0,
    warning: 1,
    error: 2,
    fatal: 3,
} as const satisfies Record<SeverityLevel, number>;

const SeverityOrdinalMapping = {
    [-1]: "debug",
    [0]: "info",
    [1]: "warning",
    [2]: "error",
    [3]: "fatal",
} as const satisfies Record<(typeof SeverityOrdinal)[keyof typeof SeverityOrdinal], SeverityLevel>;

export const SeverityCritical = {
    debug: false,
    info: false,
    log: false,
    warning: false,
    error: true,
    fatal: true,
} as const satisfies Record<SeverityLevel, boolean>;

export type MessageContent = { title: string; message: unknown };
export type AdditionalContent = { tags?: Record<string, string>; extra?: Extras };
export type Options = unknown;

export class BaseLogger<CustomOptions extends Options = Options> {
    get className() {
        return this.constructor.name;
    }

    get severityOrdinal() {
        return SeverityOrdinal[this.severityLevel];
    }
    set severityOrdinal(value: keyof typeof SeverityOrdinalMapping) {
        this.severityLevel = SeverityOrdinalMapping[value];
    }

    get severity() {
        return this.severityLevel;
    }
    set severity(value: SeverityLevel) {
        this.severityLevel = value;
    }

    get time() {
        return new Date().toISOString();
    }

    constructor(private severityLevel: SeverityLevel = "log") {}

    protected doLog<Severity extends SeverityLevel>(severity: Severity, content: MessageContent, additional?: AdditionalContent, options?: CustomOptions) {
        ({ severity, content, additional, options });
        return;
    }

    log<Severity extends SeverityLevel>(severity: Severity, content: MessageContent, additional?: AdditionalContent, options?: CustomOptions) {
        if (SeverityOrdinal[severity] < this.severityOrdinal) {
            return;
        }
        return this.doLog(severity, content, additional, options);
    }

    logDebug(content: MessageContent, additional?: AdditionalContent, options?: CustomOptions) {
        this.log("debug", content, additional, options);
    }

    logInfo(content: MessageContent, additional?: AdditionalContent, options?: CustomOptions) {
        this.log("info", content, additional, options);
    }

    logWarning(content: MessageContent, additional?: AdditionalContent, options?: CustomOptions) {
        this.log("warning", content, additional, options);
    }

    logError(content: MessageContent, additional?: AdditionalContent, options?: CustomOptions) {
        this.log("error", content, additional, options);
    }

    logFatal(content: MessageContent, additional?: AdditionalContent, options?: CustomOptions) {
        this.log("fatal", content, additional, options);
    }
}
