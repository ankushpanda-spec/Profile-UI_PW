import {fixupConfigRules, fixupPluginRules} from '@eslint/compat';
import {FlatCompat} from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import boundaries from 'eslint-plugin-boundaries';
import _import from 'eslint-plugin-import';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import globals from 'globals';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      '**/node_modules/*',
      '**/*.js',
      '**/*.js',
      '**/*.ts',
      '**/*.ts',
      '**/*.*',
      '!src/**/*',
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      'plugin:boundaries/recommended',
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'airbnb',
      'plugin:prettier/recommended'
    )
  ),
  {
    plugins: {
      boundaries: fixupPluginRules(boundaries),
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      react: fixupPluginRules(react),
      'jsx-a11y': fixupPluginRules(jsxA11Y),
      import: fixupPluginRules(_import),
      prettier: fixupPluginRules(prettier),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: 'detect',
      },

      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },

      'boundaries/elements': [
        {
          type: 'features',
          pattern: './src/features/*',
          capture: ['featureName'],
        },
        {
          type: 'app',
          pattern: './src/app/*',
        },
        {
          type: 'shared',
          pattern: './src/shared/*',
        },
        {
          type: 'pageComponents',
          pattern: './src/page-component/*',
        },
        {
          type: 'pages',
          pattern: './src/app/pages/*',
        },
      ],
    },

    rules: {
      'prefer-destructuring': 'off',
      'react/require-default-props': [
        'error',
        {
          functions: 'defaultArguments',
        },
      ],

      'import/prefer-default-export': [
        'error',
        {
          target: 'single',
        },
      ],

      'prettier/prettier': [
        'error',
        {},
        {
          usePrettierrc: true,
        },
      ],

      'react/button-has-type': 'off',
      'import/no-unresolved': 'off',
      'no-restricted-exports': 'off',
      'react/no-array-index-key': 'off',
      'react/jsx-props-no-spreading': [0],
      'no-unused-vars': 'off',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      'react/function-component-definition': ['off'],
      'react/prop-types': 'off',
      'no-console': 'warn',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/ban-tslint-comment': 'error',
      'no-unused-expressions': 'error',

      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          aspects: ['invalidHref', 'preferButton'],
        },
      ],

      'react/no-unused-prop-types': 'warn',

      'react/jsx-filename-extension': [
        1,
        {
          extensions: ['.ts', '.tsx'],
        },
      ],

      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],

      'import/order': [
        0,
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],

          'newlines-between': 'never',

          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      'boundaries/element-types': [
        2,
        {
          default: 'disallow',

          rules: [
            {
              from: ['features'],

              allow: [
                'shared',
                [
                  'features',
                  {
                    featureName: '${from.featureName}',
                  },
                ],
              ],
            },
            {
              from: ['shared'],
              allow: ['shared'],
            },
            {
              from: ['app'],
              allow: ['app'],
            },
            {
              from: ['app'],
              allow: ['shared', 'features', 'pageComponents'],
            },
            {
              from: ['pageComponents'],
              allow: ['shared', 'features', 'pageComponents'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.tsx', '**/*.ts'],

    rules: {
      'no-undef': 'off',
    },
  },
];
