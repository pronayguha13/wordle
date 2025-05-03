import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "/wordle/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      components: `${path.resolve(__dirname, "src/components")}`,
      container: `${path.resolve(__dirname, "src/container")}`,
    },
  },
  server: {
    port: 3000,
  },
});
