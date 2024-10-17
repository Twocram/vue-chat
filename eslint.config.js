import pluginVue from 'eslint-plugin-vue';
import typescript from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';

export default [
  {
    ignores: ['node_modules/**'],
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser,
        ecmaVersion: 2021,
        sourceType: 'module',
        extraFileExtensions: ['vue'],
      },
    },
    plugins: {
      vue: pluginVue,
      '@typescript-eslint': typescript,
    },
    rules: {
      'no-unused-vars': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      'vue/no-unused-vars': 'warn',
      'node/no-unsupported-features/es-syntax': 'off',
    },
    settings: {
      'vue/setup-compiler-macros': true,
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser,
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
];
