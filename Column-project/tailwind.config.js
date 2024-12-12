/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize : {
        customFontSize : '1.1rem' 
      },
      fontFamily : {
        roboto : ['Roboto', 'sans-serif'],
      },
      screens : {
         'max-sm' : {'max' : '55rem'},
         'max-lg' : {'max' : '45rem'},
         'max-mx' : {'max' : '1100px'}
      }
    },
  },
  plugins: [],
};

