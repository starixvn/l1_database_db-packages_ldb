import { afterAll, describe, expect, it, vi } from "vitest";

import { TerminalLogger } from "@ldb/logger";
import { HealthcheckServer, request } from "./index.js";

const logger = new TerminalLogger();

describe("Healthcheck Server", async () => {
    const name = "server-unit-test";
    const version = "0.1.0";
    const healthcheckServer = new HealthcheckServer({ name, version }, 0, logger);

    const service = await request({ socketPath: `/tmp/healthcheck-${name}@${version}.sock`, timeout: 100 });
    it("Return service name & version", () => {
        expect(service).toBe(`${name}@${version}`);
    });

    afterAll(() => {
        healthcheckServer.close();
    });
});

describe("Healthcheck Server Production", async () => {
    vi.spyOn(process, "env", "get").mockReturnValue({ ...process.env, NODE_ENV: "production" });

    const name = "healthcheck-server-unit-test";
    const version = "0.1.1";
    const port = 11111;
    const healthcheckServer = new HealthcheckServer({ name, version }, port, logger);

    const service = await request({ port, timeout: 100 });
    it("Return service name & version", () => {
        expect(service).toBe(`${name}@${version}`);
    });

    afterAll(() => {
        healthcheckServer.close();
        vi.restoreAllMocks();
    });
});
