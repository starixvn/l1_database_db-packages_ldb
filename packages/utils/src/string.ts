import { inspect } from "util";

/** Wrapper of `util.inspect` with no depth limit */
export function fullInspect(object: unknown, colors = false) {
    return inspect(object, {
        showHidden: false,
        colors,
        numericSeparator: true,
        breakLength: 180,
        depth: Infinity,
        maxArrayLength: Infinity,
        maxStringLength: Infinity,
    });
}

export function stringify(object: unknown, color = false) {
    if (typeof object === "object" || typeof object === "function" || typeof object === "number") {
        return fullInspect(object, color);
    } else {
        return String(object);
    }
}
