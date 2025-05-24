/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6ebf5',
          100: '#ccd7eb',
          200: '#99afe7',
          300: '#6687d2',
          400: '#335fbe',
          500: '#0A2463', // main primary
          600: '#091d4f',
          700: '#07163c',
          800: '#050e28',
          900: '#020714',
        },
        accent: {
          50: '#ffe6e6',
          100: '#ffcccc',
          200: '#ff9999',
          300: '#ff6666',
          400: '#ff3333',
          500: '#990000', // main accent
          600: '#7a0000',
          700: '#5c0000',
          800: '#3d0000',
          900: '#1f0000',
        },
        neutral: {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#2c2c2c',
          900: '#1a1a1a',
        },
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Open Sans', 'sans-serif'],
      },
      animation: {
        'ticker': 'ticker 30s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'writing': 'writing 2s infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(50%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        writing: {
          '0%': { transform: 'translateX(0) translateY(0) rotate(0)' },
          '25%': { transform: 'translateX(2px) translateY(2px) rotate(2deg)' },
          '50%': { transform: 'translateX(-2px) translateY(4px) rotate(-2deg)' },
          '75%': { transform: 'translateX(4px) translateY(-2px) rotate(2deg)' },
          '100%': { transform: 'translateX(0) translateY(0) rotate(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};