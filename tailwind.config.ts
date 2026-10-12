import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
          soft: 'rgb(var(--primary-soft) / <alpha-value>)',
        },
        mint: {
          DEFAULT: 'rgb(var(--mint) / <alpha-value>)',
          soft: 'rgb(var(--mint-soft) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--secondary) / <alpha-value>)',
          soft: 'rgb(var(--secondary-soft) / <alpha-value>)',
        },
        terracotta: {
          DEFAULT: 'rgb(var(--terracotta) / <alpha-value>)',
          soft: 'rgb(var(--terracotta-soft) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent-soft) / <alpha-value>)',
        },
        ink: {
          900: 'rgb(var(--neutral-900) / <alpha-value>)',
          700: 'rgb(var(--neutral-700) / <alpha-value>)',
          600: 'rgb(var(--neutral-600) / <alpha-value>)',
          400: 'rgb(var(--neutral-400) / <alpha-value>)',
          200: 'rgb(var(--neutral-200) / <alpha-value>)',
          100: 'rgb(var(--neutral-100) / <alpha-value>)',
          50: 'rgb(var(--neutral-50) / <alpha-value>)',
        },
        surface: 'rgb(var(--surface) / <alpha-value>)',
        success: 'rgb(var(--success) / <alpha-value>)',
        danger: 'rgb(var(--danger) / <alpha-value>)',
        whatsapp: 'rgb(var(--whatsapp) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'ui-serif', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.75rem', { lineHeight: '1.1rem' }],
        xs: ['0.8125rem', { lineHeight: '1.2rem' }],
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '10px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        blob: '62% 38% 55% 45% / 45% 55% 45% 55%',
      },
      boxShadow: {
        lift: '0 1px 2px rgba(34,119,91,0.08), 0 14px 32px -14px rgba(34,119,91,0.28)',
        card: '0 1px 0 rgba(28,42,38,0.04), 0 10px 26px -16px rgba(251,164,36,0.32)',
        ring: '0 0 0 4px rgba(251,164,36,0.2)',
        pop: '0 20px 44px -18px rgba(34,119,91,0.35)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, rgb(var(--primary)) 0%, rgb(var(--primary-soft)) 100%)',
        'sunny-mesh':
          'radial-gradient(65% 65% at 12% 15%, rgba(251,164,36,0.22), transparent 60%), radial-gradient(60% 60% at 88% 85%, rgba(91,186,155,0.42), transparent 60%)',
        'paper-grain':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      transitionTimingFunction: {
        'out-quint': 'cubic-bezier(0.22, 1, 0.36, 1)',
        wag: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
