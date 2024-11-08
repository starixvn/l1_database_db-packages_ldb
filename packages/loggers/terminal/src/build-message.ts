import { type AdditionalContent, type MessageContent, type SeverityLevel } from "@ldb/base-logger";
import { stringify } from "@ldb/utils";
import { bgCyan, bgMagenta, bgRed, bgWhite, bgYellow, bold, fgBlack, fgBlue, fgGreen, fgMagenta, fgRed, fgWhite, fgYellow, italic, raw, type Effect } from "./effects.js";
import type { TerminalOptions } from "./terminal-logger.js";

const SeverityColor = {
    debug: fgBlue,
    info: fgGreen,
    log: String,
    warning: fgYellow,
    error: fgRed,
    fatal: (text: string) => fgMagenta(bold(text)),
} as const satisfies Record<SeverityLevel, Effect>;

const SeverityTitleColor = {
    debug: String,
    info: String,
    log: String,
    warning: String,
    error: (text: string) => bgRed(fgWhite(bold(raw(` ${text} `)))),
    fatal: (text: string) => bgMagenta(fgWhite(bold(raw(` ${text} `)))),
};

const SeverityLabel = {
    debug: bgCyan(fgBlack(" D ")),
    info: bgWhite(fgBlack(" I ")),
    log: "   ",
    warning: bgYellow(fgBlack(bold(" W "))),
    error: bgRed(fgWhite(bold(" E "))),
    fatal: bgMagenta(fgWhite(bold(" F "))),
} as const satisfies Record<SeverityLevel, string>;

const INDENT_SPACES = 30 as const;

const join = (lines: string[], joiner: string) => lines.filter(Boolean).join(joiner);

const getTimeString = (time?: Date, severity: SeverityLevel = "log") => {
    const effect: Effect = SeverityColor[`${severity}`];

    if (!time) {
        return effect(new Date().toISOString());
    }
    return effect(bold(italic(time.toISOString())));
};

const getMessageString = (content: MessageContent, severity: SeverityLevel = "log") => {
    const { title, message } = content;
    const effect: Effect = SeverityColor[`${severity}`];
    const stressTitle: Effect = SeverityTitleColor[`${severity}`];

    const line: string[] = [];
    if (title) {
        line.push(stressTitle(effect(`[${title}]`)));
    }
    if (message) {
        line.push(effect(stringify(message)));
    }

    return join(line, " ");
};

const indent = (text: string) => text.replace(/\n/g, `\n${" ".repeat(INDENT_SPACES)}`);

const getExtraLabelString = (text: string) => {
    const width = INDENT_SPACES - 4;
    const truncatedText = text.length <= width ? text : `${text.substring(0, width - 3)}...`;

    const spaces = width - truncatedText.length;
    const label = bgCyan(fgBlack(bold(` ${truncatedText} `)));
    return `${" ".repeat(spaces)}${label}`;
};

const getExtraString = (additional?: AdditionalContent) => {
    const { extra = {} } = additional ?? {};
    const lines: string[] = [];

    for (const [name, data] of Object.entries(extra)) {
        const label = getExtraLabelString(name);
        const dataString = indent(stringify(data));

        lines.push(`${label}  ${dataString}`);
    }
    return join(lines, "\n");
};

export const buildMessage = (severity: SeverityLevel, content: MessageContent, additional?: AdditionalContent, options?: TerminalOptions) => {
    const { time: timeValue } = options ?? {};

    const time = getTimeString(timeValue, severity);
    const label = SeverityLabel[`${severity}`];
    const message = indent(getMessageString(content, severity));
    const extras = getExtraString(additional);

    const lines: string[] = [];
    lines.push(`${time} ${label}  ${message}`);
    lines.push(extras);
    return join(lines, "\n");
};
