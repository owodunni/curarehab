import js from "@eslint/js";
import tseslint from "typescript-eslint";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import graphql from "@graphql-eslint/eslint-plugin";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  // Base configurations
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // @ts-expect-error - Svelte config types are not fully compatible with flat config
  ...svelte.configs["flat/all"],

  // Svelte 5 parser configuration
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".svelte"],
        svelteFeatures: {
          // Enable Svelte 5 features
          experimentalGenerics: true,
        },
      },
    },
  },

  // Global settings
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        gtag: "readonly",
        dataLayer: "readonly",
      },
    },
    rules: {
      // Console usage
      "no-console": "error", // Stricter: no console statements by default

      // TypeScript rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/ban-ts-comment": "error", // Stricter: no ts-ignore comments
      "@typescript-eslint/no-empty-object-type": "error",
      "@typescript-eslint/prefer-as-const": "error",
      "@typescript-eslint/no-inferrable-types": "error",
      "@typescript-eslint/no-unused-expressions": "error",
      "@typescript-eslint/no-non-null-assertion": "error", // Avoid ! operator

      // General code quality
      "prefer-const": "error", // Now strict since we're clean
      "no-var": "error",

      eqeqeq: ["error", "always", { null: "ignore" }],
      curly: ["error", "all"], // Require braces everywhere for consistency
      "no-debugger": "error",
      "no-alert": "error",
      "no-eval": "error",
      "no-implied-eval": "error",
    },
  },

  // Configuration files (relax rules)
  {
    files: ["*.config.{js,ts,cjs}", "**/*.config.{js,ts,cjs}"],
    languageOptions: {
      globals: {
        ...globals.node,
        require: "readonly",
        module: "readonly",
        exports: "readonly",
      },
    },
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },

  // Svelte component specific rules
  {
    files: ["**/*.svelte"],
    rules: {
      // Disable problematic rules that don't work well with Tailwind/modern Svelte
      "svelte/consistent-selector-style": "off", // Feels weird to target ids
      "svelte/no-unused-class-name": "off", // False positives with Tailwind CSS
      "svelte/no-navigation-without-base": "off", // We handle base paths differently
      "svelte/experimental-require-slot-types": "off", // Too strict for current setup
      "svelte/experimental-require-strict-events": "off", // Too strict for current setup
      "svelte/block-lang": [
        "error",
        {
          enforceScriptPresent: false,
          enforceStylePresent: false,
          script: ["ts"], // a list of languages or null to signify no language specified
        },
      ],

      // Keep useful Svelte formatting rules, disable others that conflict with Prettier
      // Note: svelte/html-closing-bracket-new-line disabled to avoid Prettier conflicts
      // Prettier handles bracket placement consistently
      "svelte/html-closing-bracket-new-line": "off",

      // Disable Svelte formatting rules that conflict with Prettier
      "svelte/indent": "off", // Let Prettier handle indentation
      "svelte/max-attributes-per-line": "off", // Let Prettier handle attribute formatting
      "svelte/first-attribute-linebreak": "off", // Let Prettier handle attribute linebreaks
      "svelte/html-quotes": "off", // Let Prettier handle quotes
      "svelte/mustache-spacing": "off", // Let Prettier handle mustache spacing
      "svelte/no-spaces-around-equal-signs-in-attribute": "off", // Let Prettier handle spacing
    },
  },

  // GraphQL query files
  {
    files: ["**/*.gql", "**/*.graphql"],
    languageOptions: {
      parser: graphql.parser,
      parserOptions: {
        // Use programmatic config since we don't have a schema file
        graphQLConfig: {
          documents: ["**/*.gql", "**/*.graphql"],
          // No schema validation for now - just syntax checking
        },
      },
    },
    plugins: {
      "@graphql-eslint": graphql,
    },
    rules: {
      // Basic GraphQL syntax validation (no schema required)
      "@graphql-eslint/no-anonymous-operations": "error",
      "@graphql-eslint/naming-convention": [
        "error",
        {
          OperationDefinition: "PascalCase",
          FragmentDefinition: "PascalCase",
          VariableDefinition: "camelCase",
        },
      ],
      "@graphql-eslint/no-duplicate-fields": "error",
      // Note: no-unused-variables and no-unused-fragments require schema
    },
  },

  // Ignore patterns
  {
    ignores: [
      // Build outputs
      "node_modules/",
      "dist/",
      "build/",
      "**/.svelte-kit/",
      "**/coverage/",

      // Generated files (don't lint these)
      "*.min.js",
      "**/.gql/",
      "**/$types.gql.d.ts",
      "**/types.gql.ts",
      "**/proxy+*.ts",
      "**/dist/",

      // Tools
      ".unlighthouse*/",
    ],
  },

  // Prettier config - MUST BE LAST to override formatting rules
  prettier
);
