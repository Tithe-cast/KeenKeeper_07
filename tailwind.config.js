/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#244D3F',
        'primary-light': '#2d6350',
        secondary: '#64748B',
        dark: '#101727',
        light: '#F8FAFC',
        border: '#E9E9E9',
        'status-overdue': '#EF4444',
        'status-almost': '#F59E0B',
        'status-ontrack': '#22C55E',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


