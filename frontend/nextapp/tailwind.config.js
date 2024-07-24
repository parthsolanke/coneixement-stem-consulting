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
        "red-gradient": "linear-gradient(to right, #FF2E2E, #F6BE95)",
        "blue-gradient": "linear-gradient(to right, #0084CE, #E0F7FA)",
        "orange-gradient": "linear-gradient(to right, #FF862E, #F6BE95)",
        "purple-gradient": "linear-gradient(to right, #5B57DB, #CFF6FF)"
      },
    },
  },
  plugins: [],
};
