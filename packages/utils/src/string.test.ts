import { inspect } from "util";
import { describe, expect, it } from "vitest";
import { fullInspect, stringify } from "./index.js";

describe("function [fullInspect]", () => {
    it("Inspect number with separator", () => {
        expect(fullInspect(123)).toBe("123");
        expect(fullInspect(123456)).toBe("123_456");
        expect(fullInspect(123.987)).toBe("123.987");
        expect(fullInspect(123456.987)).toBe("123_456.987");
        expect(fullInspect(-123)).toBe("-123");
        expect(fullInspect(-123456)).toBe("-123_456");
        expect(fullInspect(-123.987)).toBe("-123.987");
        expect(fullInspect(-123456.987)).toBe("-123_456.987");
    });
    it("Inspect color", () => {
        expect(fullInspect(111, false)).toBe(inspect(111, { colors: false }));
        expect(fullInspect(222, true)).toBe(inspect(222, { colors: true }));
    });
    it("Inspect full array", () => {
        const value = Array(111).fill(2);
        expect(inspect(value)).include("more item");
        expect(fullInspect(value)).not.include("more item");
    });
    it("Inspect full object", () => {
        const value = { a: { b: { c: { d: 1 } } } };
        expect(inspect(value)).include("[Object]");
        expect(fullInspect(value)).not.include("[Object]");
    });
    it("Inspect full string", () => {
        const value = "-".repeat(11111);
        expect(inspect(value)).include("more character");
        expect(fullInspect(value)).not.include("more character");
    });
    it("Inspect breakline 80", () => {
        const value = { a: 1, b: "-".repeat(80) };
        expect(inspect(value)).include("\n");
        expect(fullInspect(value)).not.include("\n");
    });
    it("Inspect breakline 180", () => {
        const value = { a: 1, b: "-".repeat(180) };
        expect(inspect(value)).include("\n");
        expect(fullInspect(value)).include("\n");
    });
});

describe("function [stringify]", () => {
    it("stringify objects & number call fullInspect", () => {
        const testCases = [
            () => 1, //
            { a: 1 },
            [1, 2, 3, 4],
            123,
            456789,
            98765.4321,
        ];
        for (const testCase of testCases) {
            expect(stringify(testCase)).toBe(fullInspect(testCase));
            expect(stringify(testCase, true)).toBe(fullInspect(testCase, true));
        }
    });
    it("stringify literal convert to string", () => {
        const testCases = [
            "abc 1234", //
            Symbol("X"),
        ];
        for (const testCase of testCases) {
            expect(stringify(testCase)).toBe(String(testCase));
            expect(stringify(testCase, true)).toBe(String(testCase));
        }
    });
});
