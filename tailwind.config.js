/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      borderRadius: {
        "principal": '60px'
      },
      fontSize: {
        '64': '64px'
      },
      colors: {
        "principal": '#FF6F61',
        'yellow': '#FDCB82',
        'blackPrincipal': '#FAFAFA',
        'red': "#FF4D4F",
        'blue': '#1EA0FF',
        'gray_principal': '#333333',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        press: ['"Press Start 2P"', 'cursive'],
        micro: ['"Micro 5"', 'normal'],

      },
      width: {
        '180': '180px',
        '300': '300px',
        'screen': '100vw',
        '1200': '1200px',
        '124': '124.14px'
      },
      height: {

        '40': '40px',
        '60': '60px',
        '300': '300px',
        '700': '700px',
        'screen': '100vh',
      }
    }
  },
  plugins: [],
};
