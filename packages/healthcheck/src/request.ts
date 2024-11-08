import { access, constants } from "fs";
import { get, type RequestOptions } from "http";

export const request = async (options: RequestOptions) => {
    return new Promise((resolve, reject) => {
        const { socketPath } = options;
        if (socketPath) {
            access(socketPath, constants.R_OK | constants.W_OK, (err) => {
                if (err) {
                    reject(err);
                }
            });
        }

        const req = get(options, (res) => {
            let result = "";

            res.on("data", (chunk) => (result += chunk));
            res.on("end", () => resolve(result));
            res.on("error", (err) => reject(err));
        });
        req.on("timeout", () => {
            console.log("timeout");
            req.destroy();
            reject(new Error("Request timed out"));
        });
        req.end();
    });
};
