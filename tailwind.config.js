/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      primary: ["Turpis", "Arial", "sans-serif"],
      secondary: ["Inter", "Arial", "sans-serif"],
    },
    colors: {
      black: "#000000",
      gray: "#e6ebef",
      yellow: "#fac64c",
      purple: "#1e1939",
      "light-blue": "#72b2b9",
    },
    extend: {},
  },
  plugins: [],
};
