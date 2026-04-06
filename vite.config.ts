import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/chess-board.ts",
      formats: ["es"],
      fileName: "chess-board",
    },
    rollupOptions: {},
  },
  test: {
    environment: "happy-dom",
  },
});
