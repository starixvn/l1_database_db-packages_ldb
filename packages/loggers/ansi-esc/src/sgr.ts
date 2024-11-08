/**
 * Ref: https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_(Select_Graphic_Rendition)_parameters
 */

import { SGR as _SGR_ } from "./csi.js";

type NS = number | string;

/** Reset - All attributes off */
export const reset = _SGR_(0);

/** Bold */
export const bold = _SGR_(1);

/** Faint */
export const faint = _SGR_(2);

/** Italic */
export const italic = _SGR_(3);

/** Underline */
export const underline = _SGR_(4);

/** Slow Blink */
const slowBlink = _SGR_(5);

/** Rapid Blink */
const rapidBlink = _SGR_(6);

/** Invert */
export const invert = _SGR_(7);

/** Hide */
export const hide = _SGR_(8);

/** Strike */
export const strike = _SGR_(9);

/** Primary Font */
const primaryFont = _SGR_(10);

/** Alternative Font */
const alternateFont1 = _SGR_(11);
const alternateFont2 = _SGR_(12);
const alternateFont3 = _SGR_(13);
const alternateFont4 = _SGR_(14);
const alternateFont5 = _SGR_(15);
const alternateFont6 = _SGR_(16);
const alternateFont7 = _SGR_(17);
const alternateFont8 = _SGR_(18);
const alternateFont9 = _SGR_(19);

/** Fraktur */
const fraktur = _SGR_(20);

/** Doubly Underlined */
const doublyUnderlined = _SGR_(21);

/** Normal Intensity */
const normalIntensity = _SGR_(22);
export const notBold = _SGR_(22);
export const notFaint = _SGR_(22);

/** Neither Italic nor Blackletter */
const notItalicBlackletter = _SGR_(23);
export const notItalic = _SGR_(23);

/** Not Underlined */
export const notUnderline = _SGR_(24);

/** Not Blinking */
const notBlinking = _SGR_(25);

/** Proportional Spacing */
const proportionalSpacing = _SGR_(26);

/** Not Invert */
export const notInvert = _SGR_(27);

/** Reveal */
const reveal = _SGR_(28);
export const notHide = _SGR_(28);

/** Not Strike */
export const notStrike = _SGR_(29);

/** Foreground Color */
export const fgBlack = _SGR_(30);
export const fgRed = _SGR_(31);
export const fgGreen = _SGR_(32);
export const fgYellow = _SGR_(33);
export const fgBlue = _SGR_(34);
export const fgMagenta = _SGR_(35);
export const fgCyan = _SGR_(36);
export const fgWhite = _SGR_(37);

/**
 * Set Foreground 8-bit Color
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit
 * @param {number|string} [n='#']
 */
export const fgColor = <T extends NS>(n: T) => _SGR_(`38;5;${n ?? "#"}`);

/**
 * Set Foreground 24-bit Color | RGB
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#24-bit
 * @param {number|string} [r='#']
 * @param {number|string} [g='#']
 * @param {number|string} [b='#']
 */
export const fgRGB = <R extends NS, G extends NS, B extends NS>(r: R, g: G, b: B) => _SGR_(`38;2;${r ?? "#"};${g ?? "#"};${b ?? "#"}`);

/** Foreground Default */
export const fgDefault = _SGR_(39);

/** Background Color */
export const bgBlack = _SGR_(40);
export const bgRed = _SGR_(41);
export const bgGreen = _SGR_(42);
export const bgYellow = _SGR_(43);
export const bgBlue = _SGR_(44);
export const bgMagenta = _SGR_(45);
export const bgCyan = _SGR_(46);
export const bgWhite = _SGR_(47);

/**
 * Set Background 8-bit Color
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit
 * @param {number|string} [n='#']
 */
export const bgColor = <T extends NS>(n: T) => _SGR_(`48;5;${n ?? "#"}`);

/**
 * Set Background 24-bit Color | RGB
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#24-bit
 * @param {number|string} [r='#']
 * @param {number|string} [g='#']
 * @param {number|string} [b='#']
 */
export const bgRGB = <R extends NS, G extends NS, B extends NS>(r: R, g: G, b: B) => _SGR_(`48;2;${r ?? "#"};${g ?? "#"};${b ?? "#"}`);

/** Background Default */
export const bgDefault = _SGR_(49);

/** Not Proportional Spacing */
const notProportionalSpacing = _SGR_(50);

/** Framed */
const frame = _SGR_(51);

/** Encircled */
const encircle = _SGR_(52);

/** Overlined */
const overline = _SGR_(53);

/** Neither Framed nor Encircled */
const notFrameEncirle = _SGR_(54);
const notFrame = _SGR_(54);
const notEncirle = _SGR_(54);

/** Not Overlined */
const notOverline = _SGR_(55);

/**
 * Set Underline 8-bit Color
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit
 * @param {number|string} [n='#']
 */
const uColor = <T extends NS>(n: T) => _SGR_(`58;5;${n}`);

/**
 * Set Underline 24-bit Color | RGB
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#24-bit
 * @param {number|string} [r='#']
 * @param {number|string} [g='#']
 * @param {number|string} [b='#']
 */
const uRGB = <R extends NS, G extends NS, B extends NS>(r: R, g: G, b: B) => _SGR_(`58;2;${r};${g};${b}`);

/** Default Underline Color */
const uDefault = _SGR_(59);

/** Superscript */
const superscript = _SGR_(73);

/** Subscript */
const subscript = _SGR_(74);

/** Neither Superscript nor Subscript */
const notSuperscriptSubscript = _SGR_(75);
const notSuperscript = _SGR_(75);
const notSubscript = _SGR_(75);

/** Bright Foreground Color */
export const fgBrightBlack = _SGR_(90);
export const fgBrightRed = _SGR_(91);
export const fgBrightGreen = _SGR_(92);
export const fgBrightYellow = _SGR_(93);
export const fgBrightBlue = _SGR_(94);
export const fgBrightMagenta = _SGR_(95);
export const fgBrightCyan = _SGR_(96);
export const fgBrightWhite = _SGR_(97);

/** Bright Background Color */
export const bgBrightBlack = _SGR_(100);
export const bgBrightRed = _SGR_(101);
export const bgBrightGreen = _SGR_(102);
export const bgBrightYellow = _SGR_(103);
export const bgBrightBlue = _SGR_(104);
export const bgBrightMagenta = _SGR_(105);
export const bgBrightCyan = _SGR_(106);
export const bgBrightWhite = _SGR_(107);

/** All SGR parameters
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_(Select_Graphic_Rendition)_parameters
 */
export const SGR = {
    reset,
    bold,
    faint,
    italic,
    underline,
    slowBlink,
    rapidBlink,
    invert,
    hide,
    strike,
    primaryFont,
    alternateFont1,
    alternateFont2,
    alternateFont3,
    alternateFont4,
    alternateFont5,
    alternateFont6,
    alternateFont7,
    alternateFont8,
    alternateFont9,
    fraktur,
    doublyUnderlined,
    normalIntensity,
    notBold,
    notFaint,
    notItalicBlackletter,
    notItalic,
    notUnderline,
    notBlinking,
    proportionalSpacing,
    notInvert,
    reveal,
    notHide,
    notStrike,
    fgBlack,
    fgRed,
    fgGreen,
    fgYellow,
    fgBlue,
    fgMagenta,
    fgCyan,
    fgWhite,
    fgColor,
    fgRGB,
    fgDefault,
    bgBlack,
    bgRed,
    bgGreen,
    bgYellow,
    bgBlue,
    bgMagenta,
    bgCyan,
    bgWhite,
    bgColor,
    bgRGB,
    bgDefault,
    notProportionalSpacing,
    frame,
    encircle,
    overline,
    notFrameEncirle,
    notFrame,
    notEncirle,
    notOverline,
    uColor,
    uRGB,
    uDefault,
    superscript,
    subscript,
    notSuperscriptSubscript,
    notSuperscript,
    notSubscript,
    fgBrightBlack,
    fgBrightRed,
    fgBrightGreen,
    fgBrightYellow,
    fgBrightBlue,
    fgBrightMagenta,
    fgBrightCyan,
    fgBrightWhite,
    bgBrightBlack,
    bgBrightRed,
    bgBrightGreen,
    bgBrightYellow,
    bgBrightBlue,
    bgBrightMagenta,
    bgBrightCyan,
    bgBrightWhite,
};
export default SGR;
