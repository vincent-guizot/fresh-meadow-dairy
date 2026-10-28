/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2f8f4',
          100: '#e1efe6',
          200: '#c5dfd0',
          300: '#9bc6b0',
          400: '#6ca88c',
          500: '#4a7c59',
          600: '#39724e',
          700: '#2c5d3f', // Forest Primary
          800: '#254a34',
          900: '#1b3b28', // Dark Pine
        },
        cream: {
          50: '#fdfbf7',
          100: '#f9f6f0',
          200: '#f3ece0',
          300: '#ebe0cd',
        },
        butter: {
          100: '#fdf6e7',
          300: '#f7dc9f',
          400: '#f0c774',
          500: '#e6b15c', // Golden Butter
          600: '#cf9842',
        },
        cold: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          500: '#0ea5e9',
          700: '#0369a1',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(44, 93, 63, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        float: '0 20px 40px -15px rgba(27, 59, 40, 0.15)',
      }
    },
  },
  plugins: [],
};
