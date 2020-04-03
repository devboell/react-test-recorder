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
    //  "global-require": ["off"],
    //  "no-plusplus": ["off"],
    //  "arrow-parens": ["error", "as-needed"],
    //  "no-restricted-syntax": ["off"],
    //  "no-console": ["warn", { allow: ["error"] }],
    //  "no-continue": ["off"],
    // 'import/no-unresolved': [2, {}],
    //  "import/prefer-default-export": ["off"],
    //  "import/no-named-as-default": ["off"],
    //  "import/no-named-as-default-member": ["off"],
    //  "class-methods-use-this": ["off"],
    //  "eol-last": ["error", "always"],
    //  "react/forbid-prop-types": ["off"],
    //  "react/jsx-one-expression-per-line": ["warning", { allow: "single-child" }],
    //  "no-underscore-dangle": ["off"],
    //  "react/require-default-props": ["off"],
    //  "react/no-array-index-key": ["off"],
    //  "react/no-did-update-set-state": ["off"],
    //  "jsx-a11y/label-has-associated-control": ["off"],
    //  "jsx-a11y/label-has-for": ["off"],
    //  "max-len": ["off"]
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
