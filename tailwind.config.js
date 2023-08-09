/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
    },
    screens : {
      '2xs' : '360px',
      'sxs' : '430px',
      'xs' : '510px',
      'sm' : '570px'
    }
  },
  plugins: []
}
