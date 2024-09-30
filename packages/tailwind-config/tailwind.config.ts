import type { Config } from 'tailwindcss/types/config';

export default {
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6C51F5',
          dark: '#1b0b6a',
        },
        ['bg-primary']: {
          DEFAULT: '#FFFFFF',
          dark: '#181918',
        },
      },
    },
  },
  plugins: [],
} as Omit<Config, 'content'>;
