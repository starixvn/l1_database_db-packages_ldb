# @ldb/tsconfig

Common `tsconfig.json` config.

## Installation

```sh
pnpm add -D @ldb/tsconfig
```

## Usage

### For development

Add `tsconfig.json` to the root of your project

```json
{
    "$schema": "http://json.schemastore.org/tsconfig",
    "extends": "@ldb/tsconfig/tsconfig.json",
    "compilerOptions": {
        "sourceMap": true,
        "declarationMap": true,
        "sourceRoot": "../src",
        "mapRoot": "../lib",
        "rootDir": "src",
        "outDir": "lib"
    },
    "include": ["src/**/*"]
}
```

This configuration will do the following:

-   Output built files to `lib` folder
-   Create mapping for built files
-   Not exclude test files for type checking

### For production

Add `tsconfig.prod.json` to the root of your project

```json
{
    "$schema": "http://json.schemastore.org/tsconfig",
    "extends": "@ldb/tsconfig/tsconfig.json",
    "compilerOptions": {
        "rootDir": "src",
        "outDir": "lib"
    },
    "include": ["src/**/*", "!**/*.test.*"]
}
```

This configuration will do the following:

-   Output built files to `lib` folder
-   Exclude test files from being built
