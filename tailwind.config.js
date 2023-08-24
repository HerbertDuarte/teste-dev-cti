/** @type {import('tailwindcss').Config} */
module.exports = {
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
    },
    // colors:{
    //   'primary': '#22487b',
    //   'secondary' : '#a6c546',
    // }
  },
  plugins: []
}
