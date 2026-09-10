/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        accent: {
          DEFAULT: '#38bdf8',
          dark: '#0ea5e9',
          light: '#7dd3fc',
        },
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -40px) scale(1.1)' },
          '66%': { transform: 'translate(-24px, 24px) scale(0.9)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        blink: 'blink 1.1s steps(1) infinite',
        marquee: 'marquee 30s linear infinite',
        float: 'float 6s ease-in-out infinite',
        blob: 'blob 14s ease-in-out infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
      },
      boxShadow: {
        glow: '0 0 42px -10px rgba(56, 189, 248, 0.45)',
        'glow-lg': '0 0 90px -18px rgba(56, 189, 248, 0.5)',
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(rgba(56,189,248,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-lg': '56px 56px',
      },
    },
  },
  plugins: [],
}