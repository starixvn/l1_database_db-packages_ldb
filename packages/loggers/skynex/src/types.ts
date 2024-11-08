import type { AxiosProxyConfig } from "axios";
import type { IAxiosRetryConfig } from "axios-retry";

export type SkynexOptions = {
    conversationIds: Record<string, ConversationId>;
    proxy?: AxiosProxyConfig;
    retryConfig?: IAxiosRetryConfig;
};

export type ConversationId = number | string;

export type ConversationPayload = {
    conversationId: ConversationId;
    message: string;
};
