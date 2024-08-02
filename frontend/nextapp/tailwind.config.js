/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "red-gradient": "linear-gradient(to left, rgba(255, 0, 0, 0.6), rgba(200, 0, 0, 0.8))",
        "blue-gradient": "linear-gradient(to left, rgba(0, 132, 206, 0.4), rgba(0, 100, 180, 0.7))",
        "orange-gradient": "linear-gradient(to left, rgba(255, 165, 0, 0.6), rgba(250, 110, 0, 0.7))",
        "purple-gradient": "linear-gradient(to left, rgba(128, 0, 148, 0.5), rgba(85, 0, 130, 0.7))"
      },
    },
  },
  plugins: [],
};
