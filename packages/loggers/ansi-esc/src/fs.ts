/**
 * Ref: https://en.wikipedia.org/wiki/ANSI_escape_code#Fs_Escape_sequences
 */

import { ESC } from "./c0.js";

/** Reset to Initial State */
export const RIS = `${ESC}c` as const;

/** All Fs escape sequences
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#Fs_Escape_sequences
 */
export const Fs = { RIS } as const;
export default Fs;
