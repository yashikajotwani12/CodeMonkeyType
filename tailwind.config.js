/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        error: 'var(--error)',
        success: 'var(--success)',
        inactive: 'var(--inactive)',
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {
        '.bg-primary-30': {
          backgroundColor: `rgba(${theme('colors.primary').replace('#', '')}, 0.3)`,
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}