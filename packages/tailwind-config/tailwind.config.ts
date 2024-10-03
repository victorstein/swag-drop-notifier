import type { Config } from 'tailwindcss/types/config';

export default {
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        button: {
          DEFAULT: '#FFFFFF',
          dark: '#000000',
        },
        title: {
          DEFAULT: '#6C51F5',
          dark: '#ebff00',
        },
        paragraph: {
          DEFAULT: '#000000',
          dark: '#FFFFFF',
        },
        background: {
          DEFAULT: '#FFFFFF',
          dark: '#222831',
          primary: '#6C51F5',
          ['primary-dark']: '#3D2AAE',
          secondary: '#ebff00',
        },
      },
    },
  },
  plugins: [],
} as Omit<Config, 'content'>;
