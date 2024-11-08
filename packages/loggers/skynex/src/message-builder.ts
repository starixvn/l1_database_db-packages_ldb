import type { AdditionalContent, MessageContent, SeverityLevel } from "@ldb/base-logger";
import { stringify } from "@ldb/utils";

const SeverityLabel = {
    debug: "🍀",
    info: "ℹ️",
    log: "ℹ️",
    warning: "⚠️",
    error: "🔥",
    fatal: "☠️",
} as const satisfies Record<SeverityLevel, string>;

const noErrorStack = <T>(data: T) => {
    if (data instanceof Error) {
        delete data.stack;
    }
    return data;
};

const join = (data: string[], joiner: string) => data.filter(Boolean).join(joiner);

const code = (data: string) => (data ? `\`${data}\`` : "");
const bold = (data: string) => (data ? `**${data}**` : "");
const italic = (data: string) => (data ? `_${data}_` : "");
const codeBlock = (data: string) => (data ? `\`\`\`\n${data}\n\`\`\`` : "");

const squared = (data: string) => (data ? `[${data}]` : "");

export const buildMessage = (severity: SeverityLevel, environment: string, content: MessageContent, additional?: AdditionalContent) => {
    const time = new Date().toISOString();
    const label = SeverityLabel[`${severity}`];
    const { title = "", message = "" } = content;
    const { extra } = additional || {};

    const lines: string[] = [];

    lines.push(join([label, code(time)], "  "));
    lines.push(join([code(environment), bold(squared(title)), stringify(noErrorStack(message))], "  "));

    if (extra) {
        for (const [name, data] of Object.entries(extra)) {
            lines.push("\n---");
            lines.push(bold(italic(name)));
            lines.push(codeBlock(stringify(noErrorStack(data))));
        }
    }

    return join(lines, "  \n");
};
