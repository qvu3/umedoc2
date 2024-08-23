// eslint.config.mjs

import { ESLint } from "eslint";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import angularPlugin from "@angular-eslint/eslint-plugin";
import angularTemplatePlugin from "@angular-eslint/eslint-plugin-template";
import typescriptParser from "@typescript-eslint/parser";
import angularTemplateParser from "@angular-eslint/template-parser";

/** @type {ESLint.FlatConfig[]} */
const config = [
  // TypeScript configuration
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: './tsconfig.json',
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      "@angular-eslint": angularPlugin,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      ...angularPlugin.configs.recommended.rules,
    },
  },
  // Angular HTML template configuration
  {
    files: ["**/*.html"],
    ignorePatterns: ["src/assets/vendors/**"],
    languageOptions: {
      parser: angularTemplateParser,
    },
    plugins: {
      "@angular-eslint/template": angularTemplatePlugin,
    },
    rules: {
      ...angularTemplatePlugin.configs.recommended.rules,
    },
  },
];

export default config;
