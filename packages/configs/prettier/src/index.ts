import type { Config } from "prettier";

export const defaultConfig = {
    tabWidth: 4,
    useTabs: false,
    printWidth: 180,
    arrowParens: "always",
    bracketSpacing: true,
    semi: true,
    overrides: [
        {
            files: ["*.yml", "*.yaml"],
            options: {
                tabWidth: 2,
            },
        },
        {
            files: ["*.json"],
            options: {
                tabWidth: 2,
            },
        },
    ],
} as const satisfies Config;

export default defaultConfig;
