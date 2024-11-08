import type { AxiosError, AxiosInstance, AxiosStatic } from "axios";
import axiosRetry, { isNetworkError, isRetryableError, type IAxiosRetryConfig } from "axios-retry";

export type { IAxiosRetryConfig };

const DEFAULT_RETRY_TIMEOUT = 5_000;

const retryCondition = (error: AxiosError) => {
    return isNetworkError(error) || isRetryableError(error) || error.code === "ECONNABORTED" || (error.response && error.response.status === 429) || false;
};

const retryDelay = (retryCount: number) => {
    return retryCount * DEFAULT_RETRY_TIMEOUT;
};

const DEFAULT_AXIOS_RETRY_CONFIG = {
    retries: 3,
    retryCondition,
    retryDelay,
    shouldResetTimeout: true,
} as const satisfies IAxiosRetryConfig;

let axiosRetryInitiated = false;

export const initAxiosRetry = (axiosInstance: AxiosStatic | AxiosInstance, axiosRetryConfig?: IAxiosRetryConfig) => {
    if (axiosRetryInitiated) {
        return;
    }

    const configs: IAxiosRetryConfig = Object.assign({}, DEFAULT_AXIOS_RETRY_CONFIG, axiosRetryConfig);
    axiosRetry(axiosInstance, configs);
    axiosRetryInitiated = true;
};
