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
        // CMS Brand Color Identity
        'fmd-blue': {
          50: '#F0F6FC',
          100: '#EBF2FB',
          200: '#D2E3F7',
          300: '#A8CBF0',
          400: '#5F9EE3',
          500: '#2563A6', // Primary Fresh Dairy Blue
          600: '#1C4E86', // Active / Hover Dairy Blue
          700: '#163E6C',
          800: '#123257',
          900: '#0E2540',
        },
        'fmd-green': {
          50: '#E9F5EE',
          100: '#D3EBDD',
          200: '#A8D7BC',
          300: '#7CBF99',
          400: '#54A377',
          500: '#356B4B', // Primary Meadow Green
          600: '#2A573B', // Active / Hover Meadow Green
          700: '#20432E',
          800: '#183121',
          900: '#102116',
        },
        'fmd-navy': {
          50: '#F4F6F8',
          100: '#E6EAF0',
          200: '#C7D1DE',
          300: '#9BAEC5',
          400: '#5E7E9F',
          500: '#2D4B68',
          600: '#1E3B5A',
          700: '#17324D', // Deep Navy Primary
          800: '#122437',
          900: '#0B1724',
        },
        'fmd-cream': {
          50: '#FAF8F3',  // Surface Warm Card
          100: '#FAF7EF', // Main Background
          200: '#F5EFE1',
          300: '#EBE5D8', // Subtle Natural Border
          400: '#DDD5C3',
          500: '#CBC0AA',
        },
        'fmd-yellow': {
          50: '#FEF7E6',
          100: '#FDF0CE',
          200: '#FBE29D',
          300: '#F8D672',
          400: '#F5C947',
          500: '#F4C95D', // Butter Yellow Accent
          600: '#D8AA3B',
          700: '#A88124',
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
        card: '0 4px 14px 0 rgba(23, 50, 77, 0.05)',
        'card-hover': '0 8px 24px 0 rgba(23, 50, 77, 0.09)',
        modal: '0 25px 50px -12px rgba(23, 50, 77, 0.25)',
      }
    },
  },
  plugins: [],
};
