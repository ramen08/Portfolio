/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#121212',
        secondary: '#1e1e1e',
        accent: '#64ffda',
      },
      textColor: {
        primary: '#ffffff',
        secondary: '#a0a0a0',
      },
      backgroundColor: {
        primary: '#121212',
        secondary: '#1e1e1e',
      }
    },
  },
  plugins: [],
}