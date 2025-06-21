import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [vitePreprocess()],

  kit: {
    adapter: adapter({ config: "./wrangler.jsonc" }),
    alias: {
      $lib: "src/lib",
      $types: ".gql/types",
    },
    prerender: {
      concurrency: 4,
      crawl: true,
      entries: ["*", "/", "/en", "/sitemap.xml"],
    },
  },
};

export default config;
