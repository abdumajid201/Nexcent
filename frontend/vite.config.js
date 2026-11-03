import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cpSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const frontendDirectory = path.dirname(fileURLToPath(import.meta.url));
const backendAssets = path.resolve(frontendDirectory, "../backend/public");
const builtAssets = path.join(frontendDirectory, "dist/assets");

export default defineConfig({
  plugins: [react(), {
    name: "copy-backend-assets",
    closeBundle() {
      mkdirSync(builtAssets, { recursive: true });
      cpSync(backendAssets, builtAssets, { recursive: true });
    }
  }],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      "/assets": "http://localhost:3000"
    }
  }
});
