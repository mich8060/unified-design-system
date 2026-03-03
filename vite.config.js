import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const assetFileNames = (assetInfo) =>
  assetInfo.name?.endsWith(".css")
    ? "style.css"
    : "assets/[name]-[hash][extname]";

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        index: resolve(__dirname, "src/design-system/index.ts"),
        "ai/index": resolve(__dirname, "src/design-system/ai/index.ts"),
      },
      preserveEntrySignatures: "exports-only",
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
      },
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "react-router-dom",
        "@phosphor-icons/react"
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
});
