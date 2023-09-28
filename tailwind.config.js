/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: [
    "./maechan/templates/**/*.{html,js}",
    "./**/print_format/**/*.{html,js}",
    "./maechan/public/**/*.{html,js,vue}",
  ],
  presets: [
    require('frappe-ui/src/utils/tailwind.config')
  ],

  theme: {
    extend: {},
  },
  plugins: [],
}

