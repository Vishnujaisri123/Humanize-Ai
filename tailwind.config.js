/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00d4ff',
        'neon-purple': '#8b5cf6',
        'neon-green': '#00ff88',
        'electric-violet': '#7c3aed',
        'plasma-green': '#10b981',
        'chrome-gray': '#4b5563',
        'dark-bg': '#0a0a0f',
        'panel-dark': '#1a1a2e',
        'glow-blue': '#3b82f6',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'jetbrains': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'particle-float': 'particle-float 8s linear infinite',
        'ripple': 'ripple 1s ease-out forwards',
        'neural-pulse': 'neural-pulse 3s ease-in-out infinite',
        'text-glow': 'text-glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
            filter: 'brightness(1) drop-shadow(0 0 20px currentColor)',
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.05)',
            filter: 'brightness(1.2) drop-shadow(0 0 30px currentColor)',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotateY(0deg)' },
          '50%': { transform: 'translateY(-20px) rotateY(180deg)' },
        },
        'particle-float': {
          '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-10vh) rotate(360deg)', opacity: '0' },
        },
        'ripple': {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        'neural-pulse': {
          '0%, 100%': { 
            'box-shadow': '0 0 20px rgba(59, 130, 246, 0.5), inset 0 0 20px rgba(59, 130, 246, 0.1)',
            transform: 'rotateX(0deg) rotateY(0deg)',
          },
          '50%': { 
            'box-shadow': '0 0 40px rgba(59, 130, 246, 0.8), inset 0 0 40px rgba(59, 130, 246, 0.3)',
            transform: 'rotateX(5deg) rotateY(5deg)',
          },
        },
        'text-glow': {
          '0%': { 'text-shadow': '0 0 10px currentColor' },
          '100%': { 'text-shadow': '0 0 20px currentColor, 0 0 30px currentColor' },
        },
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
    },
  },
  plugins: [],
};