/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Noto Serif KR"', 'Georgia', 'serif'],
        sans: ['"Noto Sans KR"', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          50: '#f5f5f0',
          100: '#e8e8e0',
          200: '#d0d0c4',
          300: '#a8a89c',
          400: '#80807a',
          500: '#5a5a54',
          600: '#3c3c38',
          700: '#242420',
          800: '#141410',
          900: '#0a0a08',
        },
        mist: {
          DEFAULT: '#8b9ab0',
          light: '#b8c4d4',
          dark: '#5c6878',
        },
        ember: {
          DEFAULT: '#c4935a',
          light: '#d4a87a',
          dark: '#8c6440',
        },
      },
      animation: {
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'fade-up': 'fadeUp 1s ease-out forwards',
        'typewriter': 'typewriter 3s steps(40) forwards',
        'blink': 'blink 1s infinite',
        'rain': 'rain 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        rain: {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
