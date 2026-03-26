/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        ink:    '#111111',
        cream:  '#f0ede6',
        paper:  '#e8e4dc',
        yellow: '#f5e642',
        'yellow-dark': '#d4c30a',
        muted:  '#777777',
        border: '#cccccc',
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter:  '-0.03em',
        tight:    '-0.02em',
        wide:     '0.06em',
        wider:    '0.1em',
        widest:   '0.16em',
      },
    },
  },
  plugins: [],
};
