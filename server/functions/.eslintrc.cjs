module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    "max-len": ["error", {"code": 100}],
    "linebreak-style": ["error", "windows"],
    "quotes": ["error", "double"],
  },
  parserOptions: {
    "ecmaVersion": 2020,
    "sourceType": "module",
  },
};
