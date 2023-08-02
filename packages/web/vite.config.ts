import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, loadEnv } from "vite";
import codegen from "vite-plugin-graphql-codegen";
import type { CodegenConfig } from "@graphql-codegen/cli";

export default (params: { mode: string }) => {
  const env = loadEnv(params.mode, process.cwd());

  const config: CodegenConfig = {
    schema: [
      {
        [`${env.VITE_PUBLIC_CMS_URL}/graphql`]: {
          headers: {
            Authorization: `Bearer ${env.VITE_CMS_TOKEN}`
          }
        }
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

  return defineConfig({
    plugins: [codegen({ config }), sveltekit()],
    test: {
      include: ["./src/**/*.test.ts"]
    }
  });
};
