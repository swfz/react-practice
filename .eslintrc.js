module.exports = {
  root: true,
  plugins: [
    'react',
    'react-app',
    '@typescript-eslint',
    'prettier'
  ],
  extends: [
    'react-app',
    'plugin:prettier/recommended'
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/no-explicit-any': 'error',
    'import/order': 'error',
    'prettier/prettier': [
      'error',
      {
        'singleQuote': true,
        'trailingComma': 'es5'
      }
    ]
  }
}