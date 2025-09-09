// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');


module.exports = {
  content: [
    "./src/**/*.{html,ts}", // ← important pour Angular
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['"Bricolage Grotesque"', ...defaultTheme.fontFamily.sans],
        body: ['"Hanken Grotesk"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#000000',
        secondary: '#FFFFFF',
        accent: '#C7EF00',
        neutral: '#EFF6E0',
        success: '#9368B7',
        info: '#026C7C',
        warning: '#EF8A17',
        error: '#7B0D1E',
      },
    },
  },
  plugins: [],
}
