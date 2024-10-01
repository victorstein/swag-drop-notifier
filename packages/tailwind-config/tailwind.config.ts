import type { Config } from 'tailwindcss/types/config';

export default {
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        button: {
          DEFAULT: '#6C51F5',
          dark: '#3D2AAE',
        },
        title: {
          DEFAULT: '#6C51F5',
          dark: '#FFFFFF',
        },
        background: {
          DEFAULT: '#FFFFFF',
          dark: '#222831',
          primary: '#6C51F5',
          ['primary-dark']: '#3D2AAE',
        },
      },
    },
  },
  plugins: [],
} as Omit<Config, 'content'>;
