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
        'blue': '#1EA0FF'
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      width: {
        '180': '180px',
        '300': '300px',
        'screen': '100vw'
      },
      height: {
        '40': '40px',
        'screen': '100vh',
        '300': '300px',
      }
    }
  },
  plugins: [],
};
