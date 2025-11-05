/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#32b88e',
        secondary: '#2c3e50',
      },
    },
  },
  plugins: [],
}
