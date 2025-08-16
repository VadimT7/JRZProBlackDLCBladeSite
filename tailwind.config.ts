import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dlc-bg': '#0b0b0d',
        'dlc-elevation': '#0f1115',
        'dlc-text-secondary': '#e5e7eb',
        'dlc-text-primary': '#f5f5f5',
        'dlc-silver': '#c0c0c0',
        'dlc-gold': '#bfa66b',
      },
      fontFamily: {
        'cormorant': ['var(--font-cormorant)'],
        'inter': ['var(--font-inter)'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },
      boxShadow: {
        'dlc': '0 0 20px rgba(192, 192, 192, 0.1)',
        'dlc-hover': '0 0 30px rgba(192, 192, 192, 0.2)',
      },
    },
  },
  plugins: [],
}

export default config
