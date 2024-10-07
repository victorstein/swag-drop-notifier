import { createSelectors, chromeLocalStorage } from '../utils';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { flushSync } from 'react-dom';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface IThemeStorageQueries {
  theme: Theme;
  isStoreHydrated: boolean;
}

export interface IThemeStorageMutations {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setStoreHydrated: (isStoreHydrated: boolean) => void;
  resetTheme: () => void;
}

export type IThemeStorage = IThemeStorageQueries & IThemeStorageMutations;

const scopedWindow = typeof window !== 'undefined' ? window : undefined;
const defaultTheme = scopedWindow
  ? scopedWindow?.matchMedia('(prefers-color-scheme: dark)').matches
    ? Theme.DARK
    : Theme.LIGHT
  : Theme.LIGHT;

const ThemeStorageInitialState: IThemeStorageQueries = {
  theme: defaultTheme,
  isStoreHydrated: false,
};

export const ThemeStorage = create<IThemeStorage>()(
  persist(
    set => ({
      ...ThemeStorageInitialState,
      setTheme: (theme: Theme) => set({ theme }),
      toggleTheme: async () => {
        await document.startViewTransition(() => {
          flushSync(() => {
            set(state => ({ theme: state.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT }));
          });
        }).ready;

        const appContainer = document.querySelector('html:has(body > #app-container)');

        if (!appContainer) {
          return;
        }

        appContainer.animate(
          {
            clipPath: [`circle(0px at 260px 30px)`, `circle(650px at 260px 30px)`],
          },
          {
            duration: 500,
            easing: 'ease-in-out',
            pseudoElement: '::view-transition-new(root)',
          },
        );
      },
      setStoreHydrated: (isStoreHydrated: boolean) => set({ isStoreHydrated }),
      resetTheme: () => set(ThemeStorageInitialState),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => chromeLocalStorage),
      partialize: state => ({ theme: state.theme }),
      onRehydrateStorage: state => {
        return () => state.setStoreHydrated(true);
      },
    },
  ),
);

export const themeStorage = createSelectors(ThemeStorage);
