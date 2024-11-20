import type { BaseLogger } from "@ldb/logger";
import http, { type IncomingMessage, type Server, type ServerResponse } from "http";
import type { Metadata } from "./types.js";
import { getUnixSocketPath } from "./utils.js";

export class HealthcheckServer {
    private readonly server: Server;

    get className() {
        return this.constructor.name;
    }

    constructor(
        private readonly metadata: Metadata,
        private readonly healthcheckPort: number,
        private readonly logger: BaseLogger,
    ) {
        this.selfBound();

        this.server = http.createServer();
        this.server.on("listening", this.handleListening);
        this.server.on("request", this.handleRequest);

        const { NODE_ENV } = process.env;
        if (NODE_ENV === "production") {
            this.server.listen(this.healthcheckPort);
        } else {
            const unixSocketPath = getUnixSocketPath(metadata);
            this.server.listen(unixSocketPath);
        }

        process.on("exit", () => this.server.close());

        process.on("SIGINT", () => {
            this.server.close();
            process.exit(0);
        });
    }

    private selfBound() {
        this.handleListening = this.handleListening.bind(this);
        this.handleRequest = this.handleRequest.bind(this);
    }

    private handleListening() {
        const serverAddress = this.server.address();
        const address = typeof serverAddress === "string" ? serverAddress : `${serverAddress?.address}:${serverAddress?.port}`;
        this.logger.logInfo({ title: this.className, message: `Healthcheck server started on ${address}` });
    }

    private handleRequest(req: IncomingMessage, res: ServerResponse) {
        const { name, version } = this.metadata;
        res.end(`${name}@${version}`);
    }

    close() {
        this.server.closeAllConnections();
        return this.server.close();
    }
}
