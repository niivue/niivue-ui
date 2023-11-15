module.exports = {
  root: true,
  ignorePatterns: ['dist/**/*'],
  extends: ['standard', 'plugin:prettier/recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  plugins: ['prettier', 'react'],
  rules: {
    'react/prop-types': 'off',
    'import/order': 'error',
    'react/self-closing-comp': 'error',
    'prettier/prettier': [
      'error',
      {
        tabWidth: 2,
        printWidth: 120,
        singleQuote: true,
        trailingComma: 'none',
        semi: false
      }
    ]
  }
}
