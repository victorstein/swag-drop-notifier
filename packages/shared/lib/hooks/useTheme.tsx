import { useEffect } from 'react';
import { themeStorage } from '@extension/storage';

export const useTheme = () => {
  const theme = themeStorage.use.theme();
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
};
