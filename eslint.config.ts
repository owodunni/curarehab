import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';

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
      'no-console': 'warn',

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error', // Stricter now that we're clean
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/prefer-as-const': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',

      // General code quality
      'prefer-const': 'warn', // Warn instead of error for gradual adoption
      'no-var': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      curly: ['warn', 'multi-line'], // Only require braces for multi-line statements
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
      'svelte/no-unused-svelte-ignore': 'error', // Stricter since we cleaned these up
      'no-console': 'warn',
      'svelte/valid-compile': 'error',
      'svelte/require-each-key': 'error', // Stricter since we fixed all instances
      'svelte/no-useless-mustaches': 'error', // Stricter since we fixed all instances
      'svelte/no-at-html-tags': 'warn', // Warn about potential XSS
      'svelte/button-has-type': 'warn', // Ensure buttons have explicit type
      'svelte/no-target-blank': 'warn', // Security: warn about target="_blank" without rel

      // Relax some rules for Svelte props and reactive statements
      'prefer-const': 'off', // Svelte props are often declared with let but never reassigned
      curly: 'off', // Svelte reactive statements often use single-line if statements
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
