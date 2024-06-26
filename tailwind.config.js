/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      mono: ["JetBrains Mono", "monospace"],
      sans: ["Inter", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
