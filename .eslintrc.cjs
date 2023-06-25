module.exports = {
  env: { browser: true, es2020: true, "node": true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh',  '@typescript-eslint',],
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'react-refresh/only-export-components': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/no-use-before-define': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 0,
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-max-props-per-line': [1, { maximum: 1 }],
  },
}
