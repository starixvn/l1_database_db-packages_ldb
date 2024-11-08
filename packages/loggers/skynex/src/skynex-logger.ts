import { type AdditionalContent, BaseLogger, type MessageContent, type SeverityLevel } from "@ldb/base-logger";
import { buildMessage } from "./message-builder.js";
import { init, post } from "./skynex-api.js";
import type { ConversationId, SkynexOptions } from "./types.js";

export class SkynexLogger extends BaseLogger {
    private conversationIds: [string, ConversationId][];

    constructor(
        skynexOptions: SkynexOptions,
        skynexSeverityLevel: SeverityLevel = "log",
        private environment: string = "",
    ) {
        super(skynexSeverityLevel);

        const { conversationIds } = skynexOptions;
        this.conversationIds = Object.entries(conversationIds);
        init(skynexOptions);
    }

    protected async doLog(severity: SeverityLevel, content: MessageContent, additional?: AdditionalContent) {
        const message = buildMessage(severity, this.environment, content, additional);

        for (const [, conversationId] of this.conversationIds) {
            try {
                await post({ conversationId, message });
            } finally {
                //
            }
        }
    }
}
