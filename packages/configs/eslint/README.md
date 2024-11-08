# @ldb/eslint-config

Common `eslint` config.

## Installation

```sh
pnpm add -D eslint @ldb/eslint-config
```

## Usage

### Standalone project

Add `eslint.config.mjs` to the root of your project

```js
import { defaultConfig } from "@ldb/eslint-config";
export default defaultConfig;
```

### Monorepo project

Add `eslint.config.mjs` to the root of your project

```js
import { workspaceConfig } from "@ldb/eslint-config";
export default workspaceConfig;
```
