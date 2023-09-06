/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height : {
        'view' : 'calc(100vh - 90px)'
      },
      minHeight: {
        'view' : 'calc(100vh - 90px)'
      }
    },
    screens : {
      '2xs' : '360px',
      'sxs' : '430px',
      'xs' : '510px',
      'sm' : '570px',
      'md' : '700px',
      'lg' : '900px',
      'xl' : '1050px'
    },
    // colors:{
    //   'primary': '#22487b',
    //   'secondary' : '#a6c546',
    // }
  },
  plugins: []
}
