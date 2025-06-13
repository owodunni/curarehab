import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import graphql from '@graphql-eslint/eslint-plugin';

export default tseslint.config(
  // Base configurations
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // @ts-expect-error - Svelte config types are not fully compatible with flat config
  ...svelte.configs['flat/all'],

  // Svelte 5 parser configuration
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.svelte'],
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
        gtag: 'readonly',
        dataLayer: 'readonly',
      },
    },
    rules: {
      // Console usage
      'no-console': 'error', // Stricter: no console statements by default

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': 'error', // Stricter: no ts-ignore comments
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error', // Avoid ! operator

      // General code quality
      'prefer-const': 'error', // Now strict since we're clean
      'no-var': 'error',

      eqeqeq: ['error', 'always', { null: 'ignore' }],
      curly: ['error', 'all'], // Require braces everywhere for consistency
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
    },
  },

  // Configuration files (relax rules)
  {
    files: ['*.config.{js,ts,cjs}', '**/*.config.{js,ts,cjs}'],
    languageOptions: {
      globals: {
        ...globals.node,
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',
      },
    },
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  // Generated GraphQL files
  {
    files: ['**/$types.gql.d.ts', '**/types.gql.ts', '**/.gql/**'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },

  // Svelte component specific rules
  {
    files: ['**/*.svelte'],
    rules: {
      // Console usage - allow in Svelte for debugging
      'no-console': 'off',

      // Disable problematic rules that don't work well with Tailwind/modern Svelte
      'svelte/no-unused-class-name': 'off', // False positives with Tailwind CSS
      'svelte/block-lang': 'off', // We want to keep TypeScript lang attributes
      'svelte/experimental-require-strict-events': 'off', // Too strict for current setup
      'svelte/experimental-require-slot-types': 'off', // Too strict for current setup
      'svelte/no-navigation-without-base': 'off', // We handle base paths differently
      'svelte/html-closing-bracket-new-line': 'off', // Conflicts with Prettier
      'svelte/prefer-destructured-store-props': 'off', // Good suggestion but requires refactoring
      'svelte/no-ignored-unsubscribe': 'off', // Good suggestion but requires refactoring
    },
  },

  // GraphQL query files
  {
    files: ['**/*.gql', '**/*.graphql'],
    languageOptions: {
      parser: graphql.parser,
      parserOptions: {
        // Use programmatic config since we don't have a schema file
        graphQLConfig: {
          documents: ['**/*.gql', '**/*.graphql'],
          // No schema validation for now - just syntax checking
        },
      },
    },
    plugins: {
      '@graphql-eslint': graphql,
    },
    rules: {
      // Basic GraphQL syntax validation (no schema required)
      '@graphql-eslint/no-anonymous-operations': 'error',
      '@graphql-eslint/naming-convention': [
        'error',
        {
          OperationDefinition: 'PascalCase',
          FragmentDefinition: 'PascalCase',
          VariableDefinition: 'camelCase',
        },
      ],
      '@graphql-eslint/no-duplicate-fields': 'error',
      // Note: no-unused-variables and no-unused-fragments require schema
    },
  },

  // Ignore patterns
  {
    ignores: [
      // Build outputs
      'node_modules/',
      'dist/',
      'build/',
      '**/.svelte-kit/',
      '**/coverage/',

      // Generated files (don't lint these)
      '*.min.js',
      '**/.gql/',
      '**/$types.gql.d.ts',
      '**/types.gql.ts',
      '**/proxy+*.ts',
      '**/dist/',

      // Tools
      '.unlighthouse*/',
    ],
  }
);
