/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <--- This pattern covers your 'component' folder
  ],
  theme: {
    extend: {
      colors: {
        devika: {
          orange: '#FF5722',
          dark: '#1a1a1a',
        }
      }
    },
  },
  plugins: [],
}