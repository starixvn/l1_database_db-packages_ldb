import { defineConfig } from "tsup";

export const defaultConfig = defineConfig({
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    outDir: "lib",
    clean: true,
});
export default defaultConfig;
