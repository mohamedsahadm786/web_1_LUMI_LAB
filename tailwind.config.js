/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#030303',
        surface: '#0c0c0c',
        surface2: '#111111',
        hairline: 'rgba(255,255,255,0.10)',
        body: '#c2c2c2',
        whatsapp: '#25d366',
      },
      fontFamily: {
        display: ['"Clash Display"', 'sans-serif'],
        caps: ['"Six Caps"', 'sans-serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      maxWidth: {
        shell: '1320px',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        spinslow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(-1.2rem)' },
          '50%': { transform: 'translateY(1.2rem)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 26px -16px rgba(255,255,255,0.25)',
          },
          '50%': {
            boxShadow: '0 0 58px -8px rgba(255,255,255,0.42)',
          },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        spinslow: 'spinslow 26s linear infinite',
        bob: 'bob 6s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
        glow: 'glow 3.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
