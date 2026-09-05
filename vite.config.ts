// Vite serves and builds the demo site (index.html) and runs the tests.
// The published package is compiled by tsc alone; see tsconfig.build.json.
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
  },
});
