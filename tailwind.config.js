/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: [
    "./maechan/templates/**/*.{html,js}",
    "./**/print_format/**/*.{html,js}",
    "./maechan/public/**/*.{html,js,vue}",

  ],
  safelist: [
    { pattern: /text-*/ },
    { pattern: /font-*/ },
    { pattern: /p-*/ },
    { pattern: /w-*/ },
    { pattern: /indent-*/ },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

