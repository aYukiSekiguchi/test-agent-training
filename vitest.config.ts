import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["submit_tests/**", "node_modules/**"],
  },
});
