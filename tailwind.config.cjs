// import defaultTheme from 'tailwindcss/defaultTheme'
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        site: '#141414',
      },
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
