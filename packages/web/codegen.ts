import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://jardoole.xyz/graphql",
  documents: "./src/**/*.ts",
  generates: {
    "./src/__generated__/gql/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
