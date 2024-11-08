import { AdditionalContent, BaseLogger, MessageContent, type SeverityLevel } from "@ldb/base-logger";
import { buildMessage } from "./build-message.js";

export type TerminalOptions = {
    time: Date;
};

export class TerminalLogger extends BaseLogger<TerminalOptions> {
    constructor(terminalSeverityLevel: SeverityLevel = "log") {
        super(terminalSeverityLevel);
    }

    protected async doLog(severity: SeverityLevel, content: MessageContent, additional?: AdditionalContent, options?: TerminalOptions) {
        const message = buildMessage(severity, content, additional, options);
        console.log(message);
    }
}
