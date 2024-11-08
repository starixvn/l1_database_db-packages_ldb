# @ldb/tsconfig

Common `tsconfig.json` config.

## Installation

```sh
pnpm add -D @ldb/tsconfig
```

## Usage

Add `tsconfig.json` to the root of your project

```json
{
  "extends": "@ldb/tsconfig/tsconfig.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "lib"
  },
  "include": ["src/**/*"]
}
```
