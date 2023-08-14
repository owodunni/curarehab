import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [vitePreprocess()],

  kit: {
    adapter: adapter(),
    prerender: {
      crawl: true,
      // TODO(#85): Remove cookies, artiklar and personuppgiftspolicy from crawler list when those
      // pages are implemented, and linked to.
      entries: ["*", "/", "/en", "/sitemap.xml", "/cookies", "/artiklar", "/personuppgiftspolicy"]
    }
  }
};

export default config;
