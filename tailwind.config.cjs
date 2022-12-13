/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['src/**/*.tsx'],
  theme: {
    extend: {
      padding: {
        '1/2': '50%'
      }
    },
  },
  plugins: [],
}
