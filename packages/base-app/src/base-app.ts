import type { BaseLogger } from "@ldb/base-logger";
import { wait, type Metadata } from "@ldb/utils";

let exiting = false;

export class BaseApp {
    constructor(
        private readonly metadata: Metadata,
        private readonly logger: BaseLogger,
    ) {
        this.selfBound();
        this.handleExceptions();
    }

    get className() {
        return this.constructor.name;
    }

    get appName() {
        return `${this.metadata.name}@${this.metadata.version}`;
    }

    private selfBound() {
        this.handleUncaughtException = this.handleUncaughtException.bind(this);
        this.handleUnhandledRejection = this.handleUnhandledRejection.bind(this);
    }

    private handleExceptions() {
        process.addListener("uncaughtException", this.handleUncaughtException);
        process.addListener("unhandledRejection", this.handleUnhandledRejection);
    }

    private async handleUncaughtException(error: Error, origin: NodeJS.UncaughtExceptionOrigin) {
        this.terminate();

        while (exiting) {
            await wait(1_000);
        }

        exiting = true;
        this.logger.logFatal({ title: this.appName, message: error }, { tags: { event: "uncaughtException" }, extra: { error, origin } });

        await wait(5_000);
        process.exit(10);
    }

    private async handleUnhandledRejection(reason: unknown, promise: Promise<unknown>) {
        this.terminate();

        while (exiting) {
            await wait(5_000);
        }

        exiting = true;
        this.logger.logFatal({ title: this.appName, message: reason }, { tags: { event: "unhandledRejection" }, extra: { reason, promise } });

        await wait(5_000);
        process.exit(20);
    }

    initiate() {
        this.logger.logWarning({ title: this.appName, message: "App has been started." });
    }

    terminate() {}
}
