import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#050505',
        ink: '#0B0B0F',
        plum: '#3A146B',
        electric: '#7C3AED',
        flare: '#FF2FA3',
        bone: '#F5F5F5',
        smoke: '#A1A1AA',
      },
      fontFamily: {
        display: ['"Anton"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        widest2: '0.28em',
      },
      backgroundImage: {
        'glow-violet':
          'radial-gradient(60% 60% at 50% 40%, rgba(124,58,237,0.35) 0%, rgba(124,58,237,0) 70%)',
        'glow-flare':
          'radial-gradient(50% 50% at 50% 50%, rgba(255,47,163,0.28) 0%, rgba(255,47,163,0) 70%)',
        grain: "url('/images/branding/noise.png')",
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config
