import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { DEV_SERVER_HOST, DEV_SERVER_PORT } from "../config/dev";

export default defineConfig({
  base: "./",
  root: path.resolve(__dirname),
  plugins: [react()],
  server: {
    host: DEV_SERVER_HOST,
    port: DEV_SERVER_PORT,
    strictPort: true
  },
  build: {
    outDir: path.resolve(__dirname, "../../../dist-electron/renderer"),
    emptyOutDir: true
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});
