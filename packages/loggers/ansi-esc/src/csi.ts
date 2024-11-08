/**
 * Ref: https://en.wikipedia.org/wiki/ANSI_escape_code#CSI_(Control_Sequence_Introducer)_sequences
 */

import { CSI as _CSI_ } from "./fe.js";

/**
 * Cursor Up
 * @param {number} [n=1] Moves the cursor _n_ cells up
 */
export const CUU = <N extends number>(n: N) => `${_CSI_}${n ?? 1}A` as const;

/**
 * Cursor Down
 * @param {number} [n=1] Moves the cursor _n_ cells down
 */
export const CUD = <N extends number>(n: N) => `${_CSI_}${n ?? 1}B` as const;

/**
 * Cursor Forward
 * @param {number} [n=1] Moves the cursor _n_ cells forward
 */
export const CUF = <N extends number>(n: N) => `${_CSI_}${n ?? 1}C` as const;

/**
 * Cursor Back
 * @param {number} [n=1] Moves the cursor _n_ cells back
 */
export const CUB = <N extends number>(n: N) => `${_CSI_}${n ?? 1}D` as const;

/**
 * Cursor Next Line
 * @param {number} [n=1] Moves cursor to beginning of the line _n_ lines down
 */
export const CNL = <N extends number>(n: N) => `${_CSI_}${n ?? 1}E` as const;

/**
 * Cursor Previous Line
 * @param {number} [n=1] Moves cursor to beginning of the line _n_ lines up
 */
export const CPL = <N extends number>(n: N) => `${_CSI_}${n ?? 1}F` as const;

/**
 * Cursor Horizontal Absolute
 * @param {number} [n=1] Moves the cursor to column _n_
 */
export const CHA = <N extends number>(n: N) => `${_CSI_}${n ?? 1}G` as const;

/**
 * Cursor Position
 * @param {number} [n=1] Moves the cursor to row _n_
 * @param {number} [m=1] Moves the cursor to column _m_
 */
export const CUP = <N extends number, M extends number>(n: N, m: M) => `${_CSI_}${n ?? 1};${m ?? 1}H` as const;

/**
 * Erase in Display
 * @param {number} [n=0] Clears part of the screen
 *  - `0` Clear from cursor to end of screen
 *  - `1` Clear from cursor to beginning of the screen
 *  - `2` Clear entire screen
 *  - `3` Clear entire screen and delete all lines saved in the scrollback buffer
 */
export const ED = <N extends number>(n: N) => `${_CSI_}${n ?? 0}J` as const;

/**
 * Erase in Line
 * @param {number} [n=0] Erases part of the line
 *  - `0` Clear from cursor to the end of the line
 *  - `1` Clear from cursor to beginning of the line
 *  - `2` Clear entire line
 */
export const EL = <N extends number>(n: N) => `${_CSI_}${n ?? 0}K` as const;

/**
 * Scroll Up
 * @param {number} [n=1] Scroll whole page up by _n_ lines
 */
export const SU = <N extends number>(n: N) => `${_CSI_}${n ?? 1}S` as const;

/**
 * Scroll Down
 * @param {number} [n=1] Scroll whole page down by _n_ lines
 */
export const SD = <N extends number>(n: N) => `${_CSI_}${n ?? 1}T` as const;

/**
 * Horizontal Vertical Position
 * @param {number} [n=1] Moves the cursor to row _n_
 * @param {number} [m=1] Moves the cursor to column _m_
 */
export const HVP = <N extends number, M extends number>(n: N, m: M) => `${_CSI_}${n ?? 1};${m ?? 1}f` as const;

/**
 * Select Graphic Rendition
 * @param {number|string} [n=0]
 */
export const SGR = <T extends number | string>(n: T) => `${_CSI_}${n ?? 0}m` as const;

/**
 * Device Status Report
 */
export const DSR = `${_CSI_}6n` as const;

/** All CSI
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#CSI_(Control_Sequence_Introducer)_sequences
 */
export const CSI = {
    CUU,
    CUD,
    CUF,
    CUB,
    CNL,
    CPL,
    CHA,
    CUP,
    ED,
    EL,
    SU,
    SD,
    HVP,
    SGR,
    DSR,
};
export default CSI;
