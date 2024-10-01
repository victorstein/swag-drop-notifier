import type { Config } from 'tailwindcss/types/config';

export default {
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        button: {
          DEFAULT: '#6C51F5',
          dark: '#020123',
        },
        title: {
          DEFAULT: '#6C51F5',
          dark: '#FFFFFF',
        },
        background: {
          DEFAULT: '#FFFFFF',
          dark: '#151515',
          primary: '#6C51F5',
          ['primary-dark']: '#020123',
        },
      },
    },
  },
  plugins: [],
} as Omit<Config, 'content'>;
