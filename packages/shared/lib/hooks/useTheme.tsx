import { useEffect } from 'react';
import { themeStorage } from '@extension/storage';

export const useTheme = () => {
  const isThemeStorageHydrated = themeStorage.use.isStoreHydrated();
  const theme = themeStorage.use.theme();

  useEffect(() => {
    if (!isThemeStorageHydrated) {
      return;
    }

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, isThemeStorageHydrated]);
};
