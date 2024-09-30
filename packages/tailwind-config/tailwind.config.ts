import type { Config } from 'tailwindcss/types/config';

export default {
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6C51F5',
          dark: '#020123',
        },
        ['bg-primary']: {
          DEFAULT: '#FFFFFF',
          dark: '#151515',
        },
      },
    },
  },
  plugins: [],
} as Omit<Config, 'content'>;
