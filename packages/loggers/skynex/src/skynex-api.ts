import axios, { type AxiosRequestConfig } from "axios";
import { initAxiosRetry } from "./axios-retry.js";
import type { ConversationPayload, SkynexOptions } from "./types.js";

const SKYNEX_URL = "https://bot.nexdev.net/skynex/api/messages/forwardwithtoken";
const SKYNEX_TOKEN = "0A40aOc7CtpzjbBSJu8KNWQRoXyjRvf9";

const SKYNEX_API_URL = new URL(SKYNEX_URL);
SKYNEX_API_URL.searchParams.set("token", SKYNEX_TOKEN);

const skynexAxiosConfig = { baseURL: SKYNEX_API_URL.href, timeout: 1_000 } as const satisfies AxiosRequestConfig;
const skynexAPI = axios.create(skynexAxiosConfig);

export const init = (skynexOptions: SkynexOptions) => {
    const { proxy, retryConfig } = skynexOptions;
    skynexAPI.defaults.proxy = proxy;
    initAxiosRetry(skynexAPI, retryConfig);
};

export const post = async (payload: ConversationPayload, requestOptions?: AxiosRequestConfig) => {
    const data = axios.toFormData(payload);
    return await skynexAPI.post("", data, requestOptions);
};
