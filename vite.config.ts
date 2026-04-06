import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/chess-board.ts",
      formats: ["es"],
      fileName: "chess-board",
    },
  },
  test: {
    environment: "happy-dom",
  },
});
