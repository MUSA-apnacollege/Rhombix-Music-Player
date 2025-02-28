/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-bg)',
        secondary: 'var(--secondary-bg)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
      },
    },
  },
  plugins: [],
}