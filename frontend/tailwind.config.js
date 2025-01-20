/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: '#fd8b21',
        light_green: '#40b787',
        dark_green: '#165c40',
        dark: '#203856',
        grey: '#f0f3f3',
      },
    },
  },
  plugins: [],
}

