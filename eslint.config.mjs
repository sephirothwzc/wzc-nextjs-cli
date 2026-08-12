import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

const eslintConfig = defineConfig([
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    'out/**',
    'build/**',
    '**/*.hbs', // 👈 忽略所有 hbs 模版文件
    '**/*.*.hbs',
    'src/templates/**', // 👈 忽略模版目录
  ]),
  // TypeScript 支持
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    rules: {
      /**
       * 🔥 import 排序
       */
      'simple-import-sort/imports': 'error',
      // 'simple-import-sort/exports': 'error',

      /**
       * 🔥 删除未使用 import
       */
      'unused-imports/no-unused-imports': 'error',

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      /**
       * React
       */
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      /**
       * TS
       */
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-use-before-define': 'off',

      /**
       * 风格
       */
      eqeqeq: ['error', 'always', { null: 'ignore' }],

      quotes: ['off'],
      semi: ['error', 'always'],

      /**
       * ⚠️ 已替代旧规则
       */
      '@typescript-eslint/member-delimiter-style': 'off', // ❌ 已废弃

      /**
       * ⚠️ indent / quotes TS 规则已不推荐
       */
      '@typescript-eslint/indent': 'off',
    },
  },
  eslintConfigPrettier,
]);

export default eslintConfig;
