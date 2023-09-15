/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./maechan/templates/**/*.{html,js}",
    "./**/print_format/**/*.{html,js}",
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

