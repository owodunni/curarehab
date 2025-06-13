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
  ...svelte.configs['flat/recommended'],

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
      // Core Svelte rules - all errors for strict compliance
      'svelte/no-unused-svelte-ignore': 'error',
      'svelte/valid-compile': 'error',
      'svelte/require-each-key': 'error',
      'svelte/no-useless-mustaches': 'error',

      // Security rules - all errors
      'svelte/no-at-html-tags': 'error', // Prevent XSS vulnerabilities
      'svelte/no-target-blank': 'error', // Security: require rel with target="_blank"

      // Accessibility rules - all errors
      'svelte/button-has-type': 'error',

      // Code quality rules - all errors (only using confirmed existing rules)
      'svelte/no-dupe-else-if-blocks': 'error',
      'svelte/no-dupe-on-directives': 'error',
      'svelte/no-dupe-style-properties': 'error',
      'svelte/no-dynamic-slot-name': 'error',
      'svelte/no-inner-declarations': 'error',
      'svelte/no-object-in-text-mustaches': 'error',
      'svelte/no-reactive-functions': 'error',
      'svelte/no-reactive-literals': 'error',
      'svelte/no-shorthand-style-property-overrides': 'error',
      'svelte/valid-each-key': 'error',

      // Style and formatting - all errors (only using confirmed existing rules)
      'svelte/first-attribute-linebreak': 'error',
      'svelte/html-closing-bracket-spacing': 'error',
      'svelte/html-quotes': ['error', { prefer: 'double' }],
      'svelte/html-self-closing': 'error',
      'svelte/indent': ['error', { indent: 2 }],
      'svelte/max-attributes-per-line': ['error', { multiline: 1, singleline: 3 }],
      'svelte/mustache-spacing': 'error',
      'svelte/no-extra-reactive-curlies': 'error',
      'svelte/no-spaces-around-equal-signs-in-attribute': 'error',
      'svelte/prefer-class-directive': 'error',
      'svelte/prefer-style-directive': 'error',
      'svelte/shorthand-attribute': 'error',
      'svelte/shorthand-directive': 'error',
      'svelte/sort-attributes': 'error',
      'svelte/spaced-html-comment': 'error',

      // Console usage - allow in Svelte for debugging
      'no-console': 'off',

      // Relax some rules for Svelte props and reactive statements
      'prefer-const': 'off', // Svelte props are often declared with let but never reassigned
      curly: 'off', // Svelte reactive statements often use single-line if statements
      '@typescript-eslint/no-non-null-assertion': 'off', // Sometimes needed in Svelte
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
