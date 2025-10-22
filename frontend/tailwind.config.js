/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-black': '#0a0a0a',
        'space-dark': '#1a1a2e',
        'space-blue': '#16213e',
        'neon-blue': '#38BDF8',
        'neon-purple': '#8B5CF6',
        'neon-pink': '#EC4899',
        'cosmic-gold': '#F59E0B',
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'rotate-slow': 'rotate 20s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #38BDF8, 0 0 10px #38BDF8, 0 0 15px #38BDF8' },
          '100%': { boxShadow: '0 0 10px #38BDF8, 0 0 20px #38BDF8, 0 0 30px #38BDF8' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        'cosmic-gradient': 'radial-gradient(circle at 50% 50%, #38BDF8 0%, #8B5CF6 50%, #0a0a0a 100%)',
      },
    },
  },
  plugins: [],
}
