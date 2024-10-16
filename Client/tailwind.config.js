/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  mode: "jit",
  theme: {
    fontFamily:{

    },
    extend: {
      colors:{
        secondary:"",
        tertiary:"#1046b0",
      }
    },
  },
  plugins: [],
}