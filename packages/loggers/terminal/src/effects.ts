import {
    bgBlack as bgBlackEsc,
    bgBlue as bgBlueEsc,
    bgCyan as bgCyanEsc,
    bgDefault,
    bgGreen as bgGreenEsc,
    bgMagenta as bgMagentaEsc,
    bgRed as bgRedEsc,
    bgWhite as bgWhiteEsc,
    bgYellow as bgYellowEsc,
    bold as boldEsc,
    ESC,
    faint as faintEsc,
    fgBlack as fgBlackEsc,
    fgBlue as fgBlueEsc,
    fgCyan as fgCyanEsc,
    fgDefault,
    fgGreen as fgGreenEsc,
    fgMagenta as fgMagentaEsc,
    fgRed as fgRedEsc,
    fgWhite as fgWhiteEsc,
    fgYellow as fgYellowEsc,
    hide as hideEsc,
    invert as invertEsc,
    italic as italicEsc,
    notBold,
    notFaint,
    notHide,
    notInvert,
    notItalic,
    notStrike,
    notUnderline,
    strike as strikeEsc,
    underline as underlineEsc,
} from "@ldb/ansi-esc";

export type Effect = (s: string) => string;

/** Remove all formatting characters */
export const raw = <T extends string>(text: T) => text.replace(RegExp(`${ESC}[[][^m]*m`, "g"), "");

export const bold = <T extends string>(text: T) => `${boldEsc}${text}${notBold}` as const;

export const faint = <T extends string>(text: T) => `${faintEsc}${text}${notFaint}` as const;

export const italic = <T extends string>(text: T) => `${italicEsc}${text}${notItalic}` as const;

export const underline = <T extends string>(text: T) => `${underlineEsc}${text}${notUnderline}` as const;

export const invert = <T extends string>(text: T) => `${invertEsc}${text}${notInvert}` as const;

export const hide = <T extends string>(text: T) => `${hideEsc}${text}${notHide}` as const;

export const strike = <T extends string>(text: T) => `${strikeEsc}${text}${notStrike}` as const;

export const fgBlack = <T extends string>(text: T) => `${fgBlackEsc}${text}${fgDefault}` as const;

export const fgRed = <T extends string>(text: T) => `${fgRedEsc}${text}${fgDefault}` as const;

export const fgGreen = <T extends string>(text: T) => `${fgGreenEsc}${text}${fgDefault}` as const;

export const fgYellow = <T extends string>(text: T) => `${fgYellowEsc}${text}${fgDefault}` as const;

export const fgBlue = <T extends string>(text: T) => `${fgBlueEsc}${text}${fgDefault}` as const;

export const fgMagenta = <T extends string>(text: T) => `${fgMagentaEsc}${text}${fgDefault}` as const;

export const fgCyan = <T extends string>(text: T) => `${fgCyanEsc}${text}${fgDefault}` as const;

export const fgWhite = <T extends string>(text: T) => `${fgWhiteEsc}${text}${fgDefault}` as const;

export const bgBlack = <T extends string>(text: T) => `${bgBlackEsc}${text}${bgDefault}` as const;

export const bgRed = <T extends string>(text: T) => `${bgRedEsc}${text}${bgDefault}` as const;

export const bgGreen = <T extends string>(text: T) => `${bgGreenEsc}${text}${bgDefault}` as const;

export const bgYellow = <T extends string>(text: T) => `${bgYellowEsc}${text}${bgDefault}` as const;

export const bgBlue = <T extends string>(text: T) => `${bgBlueEsc}${text}${bgDefault}` as const;

export const bgMagenta = <T extends string>(text: T) => `${bgMagentaEsc}${text}${bgDefault}` as const;

export const bgCyan = <T extends string>(text: T) => `${bgCyanEsc}${text}${bgDefault}` as const;

export const bgWhite = <T extends string>(text: T) => `${bgWhiteEsc}${text}${bgDefault}` as const;
