import type { Metadata } from "@ldb/utils";
import { request } from "./request.js";

export const healthcheck = async (metadata: Metadata, healthcheckPort: number) => {
    const { NODE_ENV } = process.env;
    const { name, version } = metadata;
    if (NODE_ENV === "production") {
        return await request({ port: healthcheckPort, timeout: 100 });
    } else {
        return await request({ socketPath: `/tmp/healthcheck-${name}@${version}.sock`, timeout: 100 });
    }
};
