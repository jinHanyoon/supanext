// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust the path according to your project structure
    './public/index.html',
  ],
  theme: {
    extend: {
      keyframes: {
        wave: {
          '0%': { backgroundPosition: '100% 100%' },
          '100%': { backgroundPosition: '0% 0%' },
        },
      },
      animation: {
        wave: 'wave 4s linear infinite',
      },
      backgroundSize: {
        'wave-background': '200% 200%',
      },
      backgroundImage: {
        'skeleton-gradient': 'linear-gradient(135deg, #d1d5db 25%, #9ca3af 50%, #d1d5db 75%)',
      },
    },
  },
  plugins: [],
};