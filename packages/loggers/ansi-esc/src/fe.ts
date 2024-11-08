/**
 * Ref: https://en.wikipedia.org/wiki/ANSI_escape_code#Fe_Escape_sequences
 */

import { ESC } from "./c0.js";

/** Single Shift Two */
export const SS2 = `${ESC}N` as const;

/** Single Shift Three */
export const SS3 = `${ESC}O` as const;

/** Device Control String */
export const DCS = `${ESC}P` as const;

/** Control Sequence Introducer */
export const CSI = `${ESC}[` as const;

/** String Terminator */
export const ST = `${ESC}\\` as const;

/** Operating System Command */
export const OSC = `${ESC}]` as const;

/** Start of String */
export const SOS = `${ESC}X` as const;

/** Privacy Message */
export const PM = `${ESC}^` as const;

/** Application Program Command */
export const APC = `${ESC}_` as const;

/** All Fe escape sequences
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#Fe_Escape_sequences
 */
export const Fe = {
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
export default Fe;
