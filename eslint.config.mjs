import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  prettierConfig,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": [
        "warn",
        {
          endOfLine: "auto",
        },
      ],
      "prefer-const": "warn",
      "react/jsx-uses-vars": "warn",
      "react/prop-types": "off",
      "react/destructuring-assignment": "always",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "no-console": "warn",
      "no-debugger": "warn",
      "no-duplicate-imports": "warn",
    },
  },
];
