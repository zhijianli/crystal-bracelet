/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 20s ease-in-out infinite',
        'float-slow': 'float 25s ease-in-out infinite',
        'float-slower': 'float 30s ease-in-out infinite',
        'pulse': 'pulse 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'pulse-slower': 'pulse 5s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fadeIn': 'fadeIn 1s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-20px, 20px)' },
        },
        pulse: {
          '0%, 100%': { opacity: 0.2 },
          '50%': { opacity: 1 },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
} 