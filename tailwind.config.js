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
      keyframes: {
        'card-pop': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.015)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'card-pop': 'card-pop 260ms cubic-bezier(0.22, 1, 0.36, 1)',
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
      spacing: {
        '4xs': '14rem',
        '3xs': '16rem',
        '2xs': '18rem',
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
      },
    },
  },
  plugins: [],
}
