import { useEffect } from 'react';
import { useStorage } from './useStorage';
import { themeStorage } from '@extension/storage';

export const useTheme = () => {
  const theme = useStorage(themeStorage);
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
};
