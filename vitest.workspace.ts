import { defineWorkspace } from "vitest";

export default defineWorkspace([
  // i18n package
  {
    test: {
      include: ["packages/i18n/src/**/*.test.ts"],
      environment: "node",
    },
  },
  // web package - use its own vite config
  "packages/web/vite.config.ts",
]);
