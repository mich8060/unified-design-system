import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

/**
 * Vite configuration for building the component library
 * 
 * Run with: npm run build:lib
 * 
 * This creates:
 *   - dist/uds-components.es.js (ES modules)
 *   - dist/uds-components.umd.js (UMD for script tags)
 *   - dist/style.css (all component styles bundled)
 */
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    lib: {
      entry: resolve(__dirname, "src/ui/index.js"),
      name: "UDSComponents",
      fileName: (format) => `uds-components.${format}.js`,
    },
    rollupOptions: {
      // Externalize deps that shouldn't be bundled
      external: ["react", "react-dom", "react-router-dom"],
      output: {
        // Global variables for UMD build
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react-router-dom": "ReactRouterDOM",
        },
        // Preserve component folder structure for CSS
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "styles.css";
          return assetInfo.name;
        },
      },
    },
    // Generate sourcemaps for debugging
    sourcemap: true,
    // Don't minify for better debugging (set to true for production)
    minify: false,
  },
  // Resolve SCSS imports
  css: {
    preprocessorOptions: {
      scss: {
        // Use modern Sass API
        api: "modern-compiler",
      },
    },
  },
});
