import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    rollupOptions: {
      input: {
        home: fileURLToPath(new URL("./index.html", import.meta.url)),
        paper: fileURLToPath(new URL("./papers/rrsq-dvsc/index.html", import.meta.url)),
        fppa: fileURLToPath(new URL("./papers/fppa/index.html", import.meta.url)),
      },
    },
  },
});
