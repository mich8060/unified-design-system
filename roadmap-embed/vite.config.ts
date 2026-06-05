import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const EVENT_POSITIONS_API = "http://localhost:3040";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(repoRoot, "src"),
      "@chghealthcare/unified-design-system/styles.css": path.resolve(
        repoRoot,
        "src/styles.css",
      ),
      "@chghealthcare/unified-design-system": path.resolve(
        repoRoot,
        "src/index.ts",
      ),
      "@roadmap": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    fs: {
      allow: [__dirname, repoRoot],
    },
    watch: {
      ignored: ["**/event-positions.json"],
    },
    proxy: {
      "/api": {
        target: EVENT_POSITIONS_API,
        changeOrigin: true,
      },
    },
  },
  preview: {
    proxy: {
      "/api": {
        target: EVENT_POSITIONS_API,
        changeOrigin: true,
      },
    },
  },
  assetsInclude: ["**/*.svg", "**/*.csv"],
});
