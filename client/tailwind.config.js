/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        card: '#1a1a2e',
        'electric-blue': '#3b82f6',
        'neon-purple': '#a855f7',
        'soft-cyan': '#22d3ee',
        'alert-red': '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 15px -3px rgba(59, 130, 246, 0.4)',
      },
      backgroundImage: {
        'gradient-blue-purple': 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}