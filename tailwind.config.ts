import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // All backed by CSS variables — change :root vars to retheme everything
        primary:        'rgb(var(--c-primary)        / <alpha-value>)',
        'primary-light':'rgb(var(--c-primary-light)  / <alpha-value>)',
        accent:         'rgb(var(--c-accent)         / <alpha-value>)',
        dark:           'rgb(var(--c-bg)             / <alpha-value>)',
        'dark-2':       'rgb(var(--c-bg2)            / <alpha-value>)',
        'dark-3':       'rgb(var(--c-bg3)            / <alpha-value>)',
        'dark-4':       'rgb(var(--c-bg4)            / <alpha-value>)',
      },
      fontFamily: {
        heading: ['var(--font-montserrat)', 'sans-serif'],
        body: ['var(--font-open-sans)', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
