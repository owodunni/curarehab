import adapter from "@sveltejs/adapter-cloudflare";
import sveltePreprocess from "svelte-preprocess";
import { sentryVitePlugin } from "@sentry/vite-plugin";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    enableSourcemap: true
  },
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: sveltePreprocess({ sourceMap: true }),

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter()
  },
  plugins: [
    sentryVitePlugin({
      org: "alexander-poole",
      project: "curarehab",
      include: ".svelte-kit",
      authToken: "413e4b21eba2442a836f76771f89b38f8c9ecdd1b28743cca018c7fbd0d1a0de"
    })
  ]
};

export default config;
