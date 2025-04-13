/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize : {
        customFontSize : '1.1rem' 
      },
      fontFamily : {
        Yrsa : ['"Yrsa"', '"Noto Sans KR"', 'sans-serif'],
      },
      screens : {
         'max-sm' : {'max' : '55rem'},
         'max-lg' : {'max' : '45rem'},
         'max-mx' : {'max' : '1100px'}
      },
      gridTemplateColumns : {
        'custom-3' : '3fr 1fr 1fr 1fr 1fr 1fr',
        'custom-4' : '3fr 1fr 1fr 1fr'
      }
    },
  },
  plugins: [],
};

