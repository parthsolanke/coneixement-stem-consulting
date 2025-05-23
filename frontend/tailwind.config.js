/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'cursor-blink': 'blink 1s step-end infinite',
        'fadeIn': 'fadeIn 0.5s ease-in',
        'spin-slow': 'spin 3s linear infinite',
        'spin-slower': 'spin 4s linear infinite',
        'fade-in-down': 'fade-in-down 0.5s ease-out'
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "red-gradient": "linear-gradient(to left, rgba(255, 0, 0, 0.6), rgba(200, 0, 0, 0.8))",
        "blue-gradient": "linear-gradient(to left, rgba(0, 132, 206, 0.4), rgba(0, 100, 180, 0.7))",
        "orange-gradient": "linear-gradient(to left, rgba(255, 165, 0, 0.6), rgba(250, 110, 0, 0.7))",
        "purple-gradient": "linear-gradient(to left, rgba(128, 0, 148, 0.5), rgba(85, 0, 130, 0.7))",
        "colourfull-gradient":"linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)"
      },
    },
  },
  plugins: [],
};
