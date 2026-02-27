import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: '#0a0a0f',
        bgSecondary: '#111118',
        bgCard: '#16161f',
        gold: '#c9a84c',
        goldLight: '#f0c96e',
        purple: '#6c47ff',
        textPrimary: '#f5f5f0',
        textSecondary: '#9999aa',
        borderDark: '#2a2a3a'
      },
      animation: {
        shimmer: 'shimmer 2s linear infinite',
        gradient: 'gradient 8s ease infinite',
        fadeUp: 'fadeUp 0.8s ease-out forwards'
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: []
};

export default config;
