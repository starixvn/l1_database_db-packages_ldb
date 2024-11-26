import type { Metadata } from "@ldb/utils";

export const getUnixSocketPath = (metadata: Metadata) => {
    const { name, version } = metadata;
    return `/tmp/healthcheck-${name}@${version}.sock` as const;
};
