/**
 * Ref: https://en.wikipedia.org/wiki/ANSI_escape_code#Fp_Escape_sequences
 */

import { ESC } from "./c0.js";

/** DEC Save Cursor */
export const DECSC = `${ESC}7` as const;

/** DEC Restore Cursor */
export const DECRC = `${ESC}8` as const;

/** All Fp escape sequences
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#Fp_Escape_sequences
 */
export const Fp = { DECSC, DECRC } as const;
export default Fp;
