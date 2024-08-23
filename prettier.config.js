module.exports = {
  "semi": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": true,
  "bracketSpacing": false,
  "arrowParens": "avoid",
  "endOfLine": "lf",
   plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.js',
}

