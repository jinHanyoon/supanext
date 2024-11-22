/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        wave: {
          '0%': { backgroundPosition: '100% 100%' },
          '100%': { backgroundPosition: '0% 0%' }
        },
        admin_fade: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '50%': { transform: 'translateY(0)' },
          '100%': { opacity: '1' }
        },
        admin_posX: {
          '0%': { opacity: '0', transform: 'translateX(40px) ',  },
          '50%': { transform: 'translateX(0)',  },
          '100%': { opacity: '1',  }
        },

        detail_opacity: {
          '0%': { opacity: '0'  },
          '50%': { },
          '100%': { opacity: '1',  }
        },
        
      },
      animation: {
        wave: 'wave 4s linear infinite',
        admin_fade: 'admin_fade 1.5s ease-out forwards',
        admin_posX: 'admin_posX 1.5s ease-out forwards',
        detail_opacity: 'detail_opacity 1s ease forwards'
      
      
      },
      backgroundSize: {
        'wave-background': '200% 200%'
      },
      backgroundImage: {
        'skeleton-gradient': 'linear-gradient(135deg, #d1d5db 25%, #9ca3af 50%, #d1d5db 75%)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
}