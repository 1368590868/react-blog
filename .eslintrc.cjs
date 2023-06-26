module.exports = {
  root: true,
  extends: ['alloy', 'alloy/react', 'alloy/typescript'],
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
  },
  env: {
    es2021: true,
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'default-case': 2,
    'guard-for-in': 2,
    'no-eval': 2,
    'no-implied-eval': 2,
    'no-lone-blocks': 2,
    'require-await': 2,
    'comma-dangle': 2,
  },
};
