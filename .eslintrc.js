module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
    jsx: true,
  },
  rules: {
    semi: ['error', 'never'],
    'jsx-a11y/label-has-associated-control': ['off'],
    'jsx-curly-newline': ['required'],
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      node: {},
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },
}
