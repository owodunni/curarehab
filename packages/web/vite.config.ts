import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import codegen from "vite-plugin-graphql-codegen";

export default defineConfig({
  plugins: [codegen(), sveltekit()]
});
