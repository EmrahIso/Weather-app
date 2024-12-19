import js from '@eslint/js';

import globals from 'globals';

import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  {
    files: ['src/**/*.js'],
    ignores: ['**/*.config.js', 'webpack.*.js'],
    rules: {
      semi: 'error',
      'no-unused-vars': 'error',
      'no-undef': 'error',
    },
    extends: ['prettier'],
  },

  eslintConfigPrettier,
];
