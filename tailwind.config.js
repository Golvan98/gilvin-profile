// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: 
      {
        deepPurple: "#1A1A2E",
        neonPink: "#FF007F",
        electricYellow: "#FFD700",
        brightMagenta: "#E100FF", 
        darkNavy:"#0A192F",
        lightGray: "#E6E6E6",
        lightCyan: "#00E5FF",
    
      },
    },
  },
  plugins: [],
}
