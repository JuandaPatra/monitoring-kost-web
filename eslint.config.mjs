import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "no-unused-vars": "off", // Menonaktifkan aturan `no-unused-vars`
      "react-hooks/exhaustive-deps": "off", // Menonaktifkan aturan `react-hooks/exhaustive-deps`
      "no-console": "off", // Menonaktifkan aturan `no-console`
    },
  },
];

export default eslintConfig;
