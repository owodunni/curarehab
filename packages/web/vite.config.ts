import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineConfig({
  plugins: [
    sveltekit(),
    sentryVitePlugin({
      org: "alexander-poole",
      project: "curarehab",
      include: ".svelte-kit",
      authToken: "413e4b21eba2442a836f76771f89b38f8c9ecdd1b28743cca018c7fbd0d1a0de"
    })
  ],
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"]
  },
  build: {
    sourcemap: true
  },
  css: {
    devSourcemap: true
  }
});
