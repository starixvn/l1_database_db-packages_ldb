import { afterEach, beforeEach, describe, expect, it, suite, vi } from "vitest";
import { Scheduler } from "./index.js";

describe("class [Scheduler]", () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    suite("Event sent each period", () => {
        it("No offset", () => {
            vi.setSystemTime("2010-01-01T00:00:00Z");
            const scheduler = new Scheduler({ ONE_SEC: [1_000, 0], THREE_SECS: [3_000, 0] });
            const listeners = { one: vi.fn(), three: vi.fn() };

            scheduler.on("ONE_SEC", listeners.one);
            scheduler.on("THREE_SECS", listeners.three);

            vi.advanceTimersByTime(13_100);

            expect(listeners.one).toHaveBeenCalledTimes(13);
            expect(listeners.three).toHaveBeenCalledTimes(4);
        });

        it("With offset", () => {
            vi.setSystemTime("2020-01-01T00:00:00Z");
            const scheduler = new Scheduler({ ONE_SEC: [1_000, 1_000], THREE_SECS: [3_000, 1_000] });
            const listeners = { one: vi.fn(), three: vi.fn() };

            scheduler.on("ONE_SEC", listeners.one);
            scheduler.on("THREE_SECS", listeners.three);

            vi.advanceTimersByTime(13_100);

            expect(listeners.one).toHaveBeenCalledTimes(13);
            expect(listeners.three).toHaveBeenCalledTimes(5);
        });
    });
});
