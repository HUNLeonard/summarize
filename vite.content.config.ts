/// <reference types="vite/client" />
import { defineConfig } from "vite";
import path from "path";
import tailwindcssPlugin from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// Use the project root as the base directory
const rootDir = process.cwd();

export default defineConfig({
  plugins: [
    react(),
    (tailwindcssPlugin as unknown as () => any)(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "./src"),
    },
  },
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: path.resolve(rootDir, "src/content-script.tsx"),
      output: {
        format: "iife",
        inlineDynamicImports: true,
        entryFileNames: "content-script.js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
});

