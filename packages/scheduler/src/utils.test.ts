import { afterEach, beforeEach, describe, expect, it, suite, vi } from "vitest";
import type { TimerConfig } from "./index.js";
import { getDelayMs, throwError } from "./utils.js";

describe("function [throwError]", () => {
    it("Always throw error", () => {
        const event = "unit-test";
        const errorMessage = "expected error";
        expect(() => throwError(event, errorMessage)).toThrowError(RegExp(`.*${event}.*${errorMessage}.*`));
    });
});

describe("function [getDelayMs]", () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    suite("Return number of ms until next trigger point", () => {
        const testCases: { sysTime: string; timerConfig: TimerConfig; expectation: number }[] = [
            { sysTime: "2000-01-01T00:00:00Z", timerConfig: [60_000, 0], expectation: 60_000 },
            { sysTime: "2001-01-01T00:00:12Z", timerConfig: [30_000, 0], expectation: 18_000 },
            { sysTime: "2002-01-01T00:00:30Z", timerConfig: [30_000, 0], expectation: 30_000 },
            { sysTime: "2003-01-01T00:00:00Z", timerConfig: [30_000, 10_000], expectation: 10_000 },
            { sysTime: "2004-01-01T00:00:00Z", timerConfig: [30_000, -10_000], expectation: 20_000 },
            { sysTime: "2005-01-01T00:00:00Z", timerConfig: [30_000, 40_000], expectation: 10_000 },
            { sysTime: "2006-01-01T00:00:00Z", timerConfig: [30_000, -40_000], expectation: 20_000 },
        ];

        for (const { sysTime, timerConfig, expectation } of testCases) {
            it(`@${sysTime} - ${timerConfig}`, () => {
                vi.setSystemTime(sysTime);
                expect(getDelayMs(timerConfig)).toBe(expectation);
            });
        }
    });
});
