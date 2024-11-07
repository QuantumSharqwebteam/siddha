/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   
    
    extend: {
      height: {
        '650': '650px',
        '600': '600px',
        '500': '500px',
        '430':'430px',
        '400':'400px',
        '330':'330px',
      },
      fontFamily: {
        merriweather: ['Merriweather', 'serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        'blue': '#1e3799',
        'teal':'#48C9B0',
        'purple': '#8F3E97',
        'white':'#fff',
        'green':'#48C9B0',
        'darkgreen':'#30b298',
        'darkpurple':'#7a3081',
        'lightgreen':'#71d14b',
        'greendark':'#236B07',
        'green1':'#458B29',
        'green2':'#C9F4B8',
        'orange':'#EF7001',
        'palegreen':'#C7EDB9',

      
      },
    
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}

