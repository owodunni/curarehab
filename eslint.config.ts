import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';

export default tseslint.config(
  // Base configurations
  js.configs.recommended,
  ...tseslint.configs.recommended,
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
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
    },
  },

  // Server code (allow console)
  {
    files: ['packages/api/**/*.{js,ts}'],
    rules: {
      'no-console': 'off',
    },
  },

  // Test files
  {
    files: ['**/*.test.{js,ts}', '**/*.spec.{js,ts}', '**/tests/**/*.{js,ts}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
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
      'svelte/no-unused-svelte-ignore': 'warn',
      'no-console': 'warn',
      'svelte/valid-compile': 'warn',
      'svelte/require-each-key': 'warn', // Make this a warning instead of error
      'svelte/no-useless-mustaches': 'warn', // Make this a warning instead of error
    },
  },

  // Ignore patterns
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      '.svelte-kit/',
      'coverage/',
      '*.min.js',
      '.unlighthouse*/',
      '.gql/',
      '**/.gql/',
      '**/coverage/',
      '**/$types.gql.d.ts',
      '**/types.gql.ts',
      '**/.svelte-kit/',
      '**/proxy+*.ts',
    ],
  }
);
