# @ldb/logger

This package provide the following:

-   Logger bundle class
-   Re-export of upstream loggers (base, terminal, sentry, skynex)

## Installation

```sh
pnpm add @ldb/skynex-logger
```

## Usage

**Skynex** supports sending message to Telegram, Skype & Teams. We can initial `SkynexLogger` with conversation id from either of them.

### Get conversation id

#### Telegram

-   Add [Skynex bot `@blueskynexbot`](https://t.me/blueskynexbot) to your channel, group or private conversation
-   Register conversation by sending `register` command
-   Get conversation id by sending `group` command

#### Skype

-   Add [Skynex bot](https://join.skype.com/bot/c144a11f-2745-4e33-8eee-1da51d1217ff) to your group or private conversation
-   Register conversation by tagging `@Skynex` and sending `register` command
-   Get conversation id by tagging `@Skynex` and sending `group` command

#### Teams

-   Add [SkynexBot app](https://teams.microsoft.com/l/app/5eb526d4-aa88-46ef-a517-55cf19b36a45?source=app-details-dialog) to your chat, channel or private conversation
-   Register conversation by tagging `SkynexBot` and sending `register` command
-   Get conversation id by tagging `SkynexBot` and sending `group` command

### Create logger instance

When initial `SkynexLogger`, you can:

-   Register default conversations by passing their ids into `skynexOptions.conversationIds`.
-   Set proxy by passing proxy info into `skynexOptions.proxy`
-   Set which severity level what `SkynexLogger` will process by passing it to `skynexSeverityLevel`. For example: if `skynexSeverityLevel = "warning"`, `debug`, `log` and `info` messages will not be sent, `warning`, `error` and `fatal` will be sent.
-   Set addition environment info by passing it to `environment`

```ts
import { SkynexLogger, type SkynexOptions, type SeverityLevel } from "@ldb/skynex-logger";

const skynexOptions = {
    conversationIds: {
        telegram: "<telegram-conversation-id>",
        skype: "<skype-conversation-id>",
        teams: "<teams-conversation-id>",
    },
    proxy: {
        protocol: "http",
        host: "proxy.domain.tld",
        port: 80,
    },
} satisfies SkynexOptions;

const skynexSeverityLevel = "warning" satisfies SeverityLevel;

const environment = "DEV";

const skynex = new SkynexLogger(skynexOptions, skynexSeverityLevel, environment);
```
