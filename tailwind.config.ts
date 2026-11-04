import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#08090C',
          900: '#0F1116',
          800: '#13161D',
          700: '#232733',
          600: '#3A4050',
          400: '#808898',
          300: '#9097A6',
          200: '#C6CBD6',
          100: '#ECEEF2',
        },
        fox: {
          orange: '#FF7A00',
          red: '#FF3D00',
          amber: '#FFB547',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-sora)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'fox-grad': 'linear-gradient(135deg, #FF7A00 0%, #FF3D00 60%, #FFB547 100%)',
      },
      keyframes: {
        marquee: { to: { transform: 'translateX(-50%)' } },
        blink: { '50%': { opacity: '0' } },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        blink: 'blink 1s steps(1) infinite',
      },
    },
  },
  plugins: [],
}
export default config
