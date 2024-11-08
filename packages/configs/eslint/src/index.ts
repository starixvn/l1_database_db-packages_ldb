import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import type { TSESLint } from "@typescript-eslint/utils";
// @ts-expect-error No @types package
import google from "eslint-config-google";
import prettier from "eslint-plugin-prettier/recommended";
import pluginSecurity from "eslint-plugin-security";
import ts from "typescript-eslint";

delete google.rules["valid-jsdoc"];
delete google.rules["require-jsdoc"];

const defaultConfig: TSESLint.FlatConfig.ConfigArray = ts.config(
    google,
    js.configs.recommended,
    ...ts.configs.recommended,
    prettier,
    pluginSecurity.configs.recommended,
    {
        plugins: { "@typescript-eslint": typescriptEslint },
        languageOptions: {
            parser,
            parserOptions: {
                project: "tsconfig.json",
            },
        },
    },
    { ignores: ["*", "!src"] },
);

const workspaceConfig: TSESLint.FlatConfig.ConfigArray = ts.config(
    google,
    js.configs.recommended,
    ...ts.configs.recommended,
    prettier,
    pluginSecurity.configs.recommended,
    {
        plugins: { "@typescript-eslint": typescriptEslint },
        languageOptions: {
            parser,
            parserOptions: {
                project: "tsconfig.json",
            },
        },
    },
    { ignores: ["*", "!packages", "**/lib/**"] },
);

export { defaultConfig, workspaceConfig };
export default defaultConfig;
