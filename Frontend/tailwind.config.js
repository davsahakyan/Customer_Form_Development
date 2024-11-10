/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pageBackground: '#f9f9f9',
        compBackground: '#f1f1f180',
        tableBackground: '#fefefe',
        textHighlight: '#088582',
        buttonBlue: '#088582',
        popUpBackground: 'rgba(0, 0, 0, .5)'
      }
    },
  },
  plugins: [],
}

