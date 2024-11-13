import { afterAll, describe, expect, it, vi } from "vitest";

import { TerminalLogger } from "@ldb/logger";
import { healthcheck, HealthcheckServer } from "./index.js";

const logger = new TerminalLogger();

describe("Healthcheck", async () => {
    const name = "client-unit-test";
    const version = "0.1.0";
    const port = 12345;
    const healthcheckServer = new HealthcheckServer({ name, version }, 0, logger);

    const service = await healthcheck({ name, version }, port);
    it("Return service name & version", () => {
        expect(service).toBe(`${name}@${version}`);
    });

    afterAll(() => {
        healthcheckServer.close();
    });
});

describe("Healthcheck Production", async () => {
    vi.spyOn(process, "env", "get").mockReturnValue({ ...process.env, NODE_ENV: "production" });

    const name = "healthcheck-client-unit-test";
    const version = "0.1.1";
    const port = 54321;
    const healthcheckServer = new HealthcheckServer({ name, version }, port, logger);

    const service = await healthcheck({ name, version }, port);
    it("Return service name & version", () => {
        expect(service).toBe(`${name}@${version}`);
    });

    afterAll(() => {
        healthcheckServer.close();
        vi.restoreAllMocks();
    });
});
