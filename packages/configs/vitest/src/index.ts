import { configDefaults, mergeConfig, type ViteUserConfig } from "vitest/config";

const projectConfig = {
    test: {
        include: ["src/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
        exclude: [...configDefaults.exclude, "lib/**"],
        coverage: {
            include: ["src/**/*.?(c|m)[jt]s?(x)"],
            reporter: ["lcov", "text"],
        },
        passWithNoTests: true,
        env: {
            NODE_ENV: "test",
        },
    },
} as const satisfies ViteUserConfig;

const packageConfig = {
    test: {
        include: ["packages/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
        exclude: [...configDefaults.exclude, "**/lib/**"],
    },
} as const satisfies ViteUserConfig;

export const defaultConfig = mergeConfig(configDefaults, projectConfig);

export const workspaceConfig = mergeConfig(configDefaults, packageConfig);

export default defaultConfig;
