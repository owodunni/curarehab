import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, loadEnv, type Plugin } from "vite";
import type { CodegenConfig } from "@graphql-codegen/cli";
import "isomorphic-unfetch";
import { Client, fetchExchange } from "@urql/core";
import { createSitemap } from "./src/lib/sitemap";
import { promises as fs } from "fs";
import { svelteTesting } from "@testing-library/svelte/vite";

// Retry wrapper for GraphQL codegen with exponential backoff
function createRetryCodegenPlugin(config: CodegenConfig, maxRetries = 5): Plugin {
  return {
    name: "retry-graphql-codegen",
    async buildStart() {
      let lastError: Error | null = null;

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          console.log(`🔄 GraphQL codegen attempt ${attempt}/${maxRetries}...`);

          // Import and run codegen directly
          const { generate } = await import("@graphql-codegen/cli");
          await generate(config, true);

          console.log(`✅ GraphQL codegen succeeded on attempt ${attempt}`);
          return; // Success!
        } catch (error) {
          lastError = error as Error;
          console.warn(`⚠️  GraphQL codegen attempt ${attempt} failed:`, error);

          if (attempt < maxRetries) {
            const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000); // Exponential backoff, max 10s
            console.log(`⏳ Retrying in ${delay}ms...`);
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }
      }

      console.error(`❌ GraphQL codegen failed after ${maxRetries} attempts`);
      throw lastError;
    },
  };
}

const sitemapPlugin = (client: Client): Plugin => {
  const sitemap = async () =>
    createSitemap(client, await fs.readFile("./src/lib/sitemap/query.gql", "utf8"));
  return {
    name: "sitemap-plugin",
    buildStart() {
      setTimeout(() => {
        sitemap().then((s) => {
          fs.writeFile("./static/sitemap.xml", s);
        });
      }, 1000);
    },
  };
};

export default (params: { mode: string }) => {
  const env = loadEnv(params.mode, process.cwd());
  const graphqlUrl = `${env.VITE_PUBLIC_CMS_URL}/graphql`;
  const graphqlHeaders = {
    headers: {
      Authorization: `Bearer ${env.VITE_CMS_TOKEN}`,
    },
  };

  const config: CodegenConfig = {
    schema: [
      {
        [graphqlUrl]: graphqlHeaders,
      },
    ],
    documents: "./src/**/*.gql",
    generates: {
      ".gql/types/types.gql.ts": { plugins: ["typescript"] },
      "src/": {
        preset: "near-operation-file",
        presetConfig: {
          fileName: "$types",
          extension: ".gql.d.ts",
          baseTypesPath: ".gql/types/types.gql.ts",
        },
        plugins: ["typescript-operations"],
      },
    },
  };

  const client = new Client({
    url: graphqlUrl,
    fetchOptions: graphqlHeaders,
    exchanges: [fetchExchange],
  });

  return defineConfig({
    plugins: [
      createRetryCodegenPlugin(config, 5), // Use retry wrapper with 5 attempts
      sitemapPlugin(client),
      sveltekit(),
      svelteTesting(),
    ],
    test: {
      include: ["./src/**/*.test.ts"],
      environment: "jsdom",
      coverage: {
        provider: "v8",
        reporter: ["text", "html", "lcov"],
        include: ["src/**/*.{js,ts,svelte}"],
        exclude: ["src/**/*.test.ts", "src/**/*.d.ts", "src/**/*.gql.d.ts", "src/app.html"],
      },
    },
  });
};
