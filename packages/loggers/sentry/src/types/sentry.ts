import type { SeverityLevel } from "@ldb/base-logger";

declare module "@sentry/node" {
    interface Scope {
        setLevel(level: SeverityLevel): this;
    }
}

export {};
