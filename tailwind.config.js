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
        prodly: {
          bg: '#0d0f12',          // Ultra dark matte black background
          card: '#16181d',        // Card background from the screenshot
          cardHover: '#1c2026',   // Card hover / elevated background
          border: '#232730',      // Subtle dark border
          borderLight: '#2d333f', // Slightly lighter border
          sidebar: '#0d0f12',     // Sidebar background
          lime: '#ccff00',        // Vibrant signature neon lime
          limeDim: '#a8d900',
          limeBg: 'rgba(204, 255, 0, 0.12)',
          orange: '#ff9933',      // Vibrant signature orange
          orangeDim: '#e68022',
          orangeBg: 'rgba(255, 153, 51, 0.12)',
          text: '#ffffff',        // Primary high contrast text
          muted: '#8b949e',       // Secondary muted text
          dim: '#484f58',         // Dim placeholder text
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
        'glow-lime': '0 0 24px -4px rgba(204, 255, 0, 0.25)',
        'glow-orange': '0 0 24px -4px rgba(255, 153, 51, 0.25)',
      },
    },
  },
  plugins: [],
}
