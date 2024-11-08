import { AdditionalContent, BaseLogger, MessageContent, type SeverityLevel } from "@ldb/base-logger";
import { stringify } from "@ldb/utils";
import { captureException, captureMessage, getCurrentHub, init, withScope, type NodeOptions } from "@sentry/node";
import type { ScopeContext } from "@sentry/types";
import "./types/sentry.js";

const DEFAULT_SENTRY_NODE_OPTIONS = {
    environment: "development",
    integrations(integrations) {
        return integrations.filter(({ name }) => name !== "Console");
    },
} as const satisfies NodeOptions;

const isActive = () => {
    const currentHub = getCurrentHub();
    const currentClient = currentHub.getClient();

    if (!currentClient || currentClient.getOptions().enabled === false) {
        return false;
    }
    return true;
};

export type { NodeOptions };
export type SentryOptions = Partial<ScopeContext>;

export class SentryLogger extends BaseLogger<SentryOptions> {
    constructor(
        sentryNodeOptions: NodeOptions,
        private sentryOptions: SentryOptions = {},
        sentrySeverityLevel: SeverityLevel = "log",
    ) {
        super(sentrySeverityLevel);
        this.initSentry(sentryNodeOptions);
    }

    private initSentry(sentryOptions: NodeOptions) {
        if (isActive()) {
            return;
        }

        const options: NodeOptions = Object.assign({}, DEFAULT_SENTRY_NODE_OPTIONS, sentryOptions);
        init(options);
        this.logInfo({ title: this.className, message: "Sentry for Node.js initialized" }, { extra: { ...options } });
    }

    protected doLog(severity: SeverityLevel, content: MessageContent, additional?: AdditionalContent, options?: SentryOptions) {
        withScope((scope) => {
            const { title = "<anonymous>", message } = content;

            scope.update(this.sentryOptions);
            scope.update(options);
            scope.update(additional);
            scope.update({ tags: { title } });
            scope.setLevel(severity);

            if (message instanceof Error) {
                captureException(message);
                return;
            }
            if (typeof message === "object") {
                scope.setExtra("__serialize__", message);
                captureMessage(`[${title}] Object captured`);
                return;
            }
            captureMessage(`[${title}] ${stringify(message)}`);
        });
    }
}
