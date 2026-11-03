/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#FFF8F0',
        text: '#1C1C1C',
        accent: '#FF6B35',
        gold: '#FFB347',
        surface: '#FFE8D6',
        night: '#161412', 
      },
      fontFamily: {
        heading: ['Lobster Two', 'cursive'],
      },
    },
  },
  plugins: [],
}