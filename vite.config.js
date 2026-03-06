import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const cssSideEffectPattern = /\.(css|scss|sass)$/;
const assetFileNames = (assetInfo) =>
  assetInfo.name?.endsWith(".css")
    ? "style.css"
    : "assets/[name]-[hash][extname]";

export default defineConfig(() => {
  const usePreactCompat =
    process.env.UDS_USE_PREACT_COMPAT === "1" ||
    process.env.UDS_USE_PREACT_COMPAT === "true";

  return {
    plugins: [react()],
    resolve: {
      alias: usePreactCompat
        ? {
            react: "preact/compat",
            "react-dom": "preact/compat",
            "react-dom/test-utils": "preact/test-utils",
            "react/jsx-runtime": "preact/jsx-runtime",
          }
        : {},
    },
    server: {
      port: 5173,
      sourcemapIgnoreList: () => true,
    },
    css: {
      devSourcemap: false,
    },
    build: {
      sourcemap: false,
      cssCodeSplit: false,
      rollupOptions: {
        input: {
          index: resolve(__dirname, "src/design-system/index.ts"),
          "figma-make/index": resolve(__dirname, "src/design-system/figma-make/index.ts"),
          "ai/index": resolve(__dirname, "src/design-system/ai/index.ts"),
          "ai/manifest/index": resolve(__dirname, "src/design-system/ai/manifest/index.ts"),
          "ai/validation/index": resolve(__dirname, "src/design-system/ai/validation/index.ts"),
          "ai/sdk/index": resolve(__dirname, "src/design-system/ai/sdk/index.ts"),
          "ai/examples/index": resolve(__dirname, "src/design-system/ai/examples/index.ts"),
        },
        preserveEntrySignatures: "exports-only",
        treeshake: {
          moduleSideEffects: (id) => cssSideEffectPattern.test(id),
          propertyReadSideEffects: false,
        },
        external: [
          "react",
          "react-dom",
          "react/jsx-runtime",
          "react/jsx-dev-runtime",
          "react-router-dom",
          "@phosphor-icons/react",
        ],
        output: [
          {
            format: "es",
            preserveModules: true,
            preserveModulesRoot: "src/design-system",
            entryFileNames: "[name].js",
            chunkFileNames: "chunks/[name]-[hash].js",
            assetFileNames,
          },
          {
            format: "cjs",
            preserveModules: true,
            preserveModulesRoot: "src/design-system",
            entryFileNames: "[name].cjs",
            chunkFileNames: "chunks/[name]-[hash].cjs",
            assetFileNames,
            exports: "named",
          },
        ],
      },
    },
  };
});
