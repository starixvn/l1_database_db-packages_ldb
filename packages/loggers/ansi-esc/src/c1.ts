/**
 * Ref: https://en.wikipedia.org/wiki/ANSI_escape_code#Fe_Escape_sequences
 */

/** Single Shift Two */
export const SS2 = "\x8E" as const;

/** Single Shift Three */
export const SS3 = "\x8F" as const;

/** Device Control String */
export const DCS = "\x90" as const;

/** Control Sequence Introducer */
export const CSI = "\x9B" as const;

/** String Terminator */
export const ST = "\x9C" as const;

/** Operating System Command */
export const OSC = "\x9D" as const;

/** Start of String */
export const SOS = "\x98" as const;

/** Privacy Message */
export const PM = "\x9E" as const;

/** Application Program Command */
export const APC = "\x9F" as const;

/** All C1 control codes
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#Fe_Escape_sequences
 */
export const C1 = {
    SS2,
    SS3,
    DCS,
    CSI,
    ST,
    OSC,
    SOS,
    PM,
    APC,
} as const;
export default C1;
