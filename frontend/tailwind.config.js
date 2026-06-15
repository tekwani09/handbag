/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': '14px',
        '4.5xl': '42px',
      },
      colors: {
        primary: {
          50: '#f8f9fa',
          100: '#f1f3f4',
          500: '#1a1a1a',
          600: '#0d1117',
          900: '#000000',
        },
        'surface-image': '#f5f5f5',
        'surface-secondary': '#e5e5e5',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      aspectRatio: {
        'image': '4 / 5',
      },
    },
  },
  plugins: [],
}