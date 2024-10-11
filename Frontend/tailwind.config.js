/** @type {import('tailwindcss').Config} */
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
   
        // ... other configurations
        plugins: [
          require('daisyui'),
          require('tailwind-scrollbar'),
          require('flowbite/plugin'), 
          // ... other plugins
        ],
  
  };
  