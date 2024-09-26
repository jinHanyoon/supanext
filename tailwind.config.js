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
        wave: 'wave 2s linear infinite',
      },
      backgroundSize: {
        'wave-background': '50% 50%',
      },
      backgroundImage: {
        // 배경색을 더 어둡게, 웨이브를 더 밝게 조정
        'skeleton-gradient': 'linear-gradient(135deg, #1c1f26 35%, #707d93 50%, #1c1f26 65%)',
      },

      colors: {
        'custom-bg': '#d6d5c9',// 이 색상 값은 예시입니다. 실제 이미지의 색상과 일치하도록 조정해야 합니다.
      },
    },
  },
  plugins: [],
};