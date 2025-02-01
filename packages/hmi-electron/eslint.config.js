import eslint from '@eslint/js'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import prettierEslintConfig from 'eslint-config-prettier'

export default [
  // eslint.configs.recommended,
  {
    files: ['src/**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    ignores: ['**/*.config.js'],
    plugins: {
      '@typescript/eslint': typescript,
      react: react
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-imports': 'off',
      'unused-imports/no-unused-imports': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off'
    }
  }
  // prettierEslintConfig
]
