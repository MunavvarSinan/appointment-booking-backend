import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["esm", "cjs"],
  target: "es2020",
  outExtension: () => ({ js: '.js' }),
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  minify: false,
  shims: true,
  tsconfig: "./tsconfig.json"
});
