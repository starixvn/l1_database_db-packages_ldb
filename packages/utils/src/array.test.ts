import { describe, expect, it } from "vitest";
import { subtractArrays } from "./index.js";

describe("function [subtractArrays]", () => {
    it("Return the subtracted array (A - B)", () => {
        const testCases = [
            { arrayA: ["a", "b", "c"], arrayB: ["b", "C", "D"], expected: ["b"] },
            { arrayA: ["a", "b", "C"], arrayB: ["C", "D", "a"], expected: ["a", "C"] },
            { arrayA: ["C", "b", "a"], arrayB: ["C", "D", "a"], expected: ["C", "a"] },
            { arrayA: ["a", "b", "c"], arrayB: ["C", "D", "A"], expected: [] },
            { arrayA: ["a", "b", "c", "a", 1, 2, 3, "a"], arrayB: [1, "D", "a"], expected: ["a", "a", 1, "a"] },
        ];

        for (const { arrayA, arrayB, expected } of testCases) {
            expect(subtractArrays(arrayA, arrayB)).toStrictEqual(expected);
        }
    });
});
