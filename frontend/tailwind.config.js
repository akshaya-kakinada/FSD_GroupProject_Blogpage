/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F4EF',
        charcoal: '#232323',
        beige: '#E8DFD1',
        gold: '#B4975A',
        muted: '#727272'
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        premium: '0 18px 38px rgba(0,0,0,0.09)'
      }
    }
  },
  plugins: []
};
