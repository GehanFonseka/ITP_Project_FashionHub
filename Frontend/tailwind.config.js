/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        russo: ["Russo One", "sans-serif"],
        saira: ["Saira", "sans-serif"],
      },
      colors: {
        primary: "#E76F51",
        secondary: "#5C646C",
        light: "#F4F4F4",
        dark: "#212529",
      },
    },
  },
  plugins: [
    daisyui,
    // other plugins can also be imported and added similarly
  ],
};
