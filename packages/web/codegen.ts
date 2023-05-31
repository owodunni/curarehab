import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://jardoole.xyz/graphql",
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

export default config;
