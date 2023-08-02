import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  webServer: {
    command: "npm run dev",
    port: 5173
  },
  testDir: "tests",
  testMatch: /(.+\.)?(test|spec)\.[jt]s/
};

export default config;
