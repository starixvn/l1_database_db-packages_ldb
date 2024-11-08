/**
 * Ref: https://en.wikipedia.org/wiki/ANSI_escape_code#C0_control_codes
 */

/** Bell */
export const BEL = "\x07" as const;

/** Backspace */
export const BS = "\x08" as const;

/** Tab (8) */
export const HT = "\x09" as const;

/** Line Feed */
export const LF = "\x0A" as const;

/** Form Feed */
export const FF = "\x0C" as const;

/** Carriage Return */
export const CR = "\x0D" as const;

/** Escape */
export const ESC = "\x1B" as const;

/** All C0 control codes
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#C0_control_codes
 */
export const C0 = {
    BEL,
    BS,
    HT,
    LF,
    FF,
    CR,
    ESC,
} as const;
export default C0;
