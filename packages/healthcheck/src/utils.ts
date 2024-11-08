import type { Metadata } from "./types.js";

export const getUnixSocketPath = (metadata: Metadata) => {
    const { name, version } = metadata;
    return `/tmp/healthcheck-${name}@${version}.sock` as const;
};
