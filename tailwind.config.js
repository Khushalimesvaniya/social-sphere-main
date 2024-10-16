/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInOut: {
          '0%, 100%': { opacity: '0' },  // Invisible at the start and end
          '50%': { opacity: '1' },       // Fully visible at the midpoint
        },
      },
      animation: {
        fadeInOut: 'fadeInOut 2s ease-in-out infinite', // 2 seconds duration, infinite looping
      },
    },
  },
  plugins: [],
};
