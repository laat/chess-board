import { defineConfig } from "vitest/config";

export default defineConfig({
  build: {
    sourcemap: true,
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
