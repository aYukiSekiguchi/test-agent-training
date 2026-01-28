import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["submit_tests/**/*.test.ts"],
    fileParallelism: false,
  },
});
