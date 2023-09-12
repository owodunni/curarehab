import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, loadEnv, type Plugin } from "vite";
import codegen from "vite-plugin-graphql-codegen";
import type { CodegenConfig } from "@graphql-codegen/cli";
import "isomorphic-unfetch";
import { Client, fetchExchange } from "@urql/core";
import { createSitemap } from "./src/lib/sitemap";
import { promises as fs } from "fs";

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
    }
  };
};

export default (params: { mode: string }) => {
  const env = loadEnv(params.mode, process.cwd());
  const graphqlUrl = `${env.VITE_PUBLIC_CMS_URL}/graphql`;
  const graphqlHeaders = {
    headers: {
      Authorization: `Bearer ${env.VITE_CMS_TOKEN}`
    }
  };

  const config: CodegenConfig = {
    schema: [
      {
        [graphqlUrl]: graphqlHeaders
      }
    ],
    documents: "./src/**/*.gql",
    generates: {
      ".gql/types/types.gql.ts": { plugins: ["typescript"] },
      "src/": {
        preset: "near-operation-file",
        presetConfig: {
          fileName: "$types",
          extension: ".gql.d.ts",
          baseTypesPath: ".gql/types/types.gql.ts"
        },
        plugins: ["typescript-operations"]
      }
    }
  };

  const client = new Client({
    url: graphqlUrl,
    fetchOptions: graphqlHeaders,
    exchanges: [fetchExchange]
  });

  return defineConfig({
    plugins: [codegen({ config }), sitemapPlugin(client), sveltekit()],
    test: {
      include: ["./src/**/*.test.ts"]
    }
  });
};
