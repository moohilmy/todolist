/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        lightblue: 'var(--lightblue)',
        backgroundcolor: "var(--backgroundcolor)", 
        black: "var(--black)",
        darkblue: "var(--darkblue)",
      }
    },
  },
  
  plugins: [],
}

