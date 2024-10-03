import { ChromeLocalStorage } from 'zustand-chrome-storage';
import { createSelectors } from '../utils';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { flushSync } from 'react-dom';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface IThemeStorageQueries {
  theme: Theme;
}

export interface IThemeStorageMutations {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  resetTheme: () => void;
}

export type IThemeStorage = IThemeStorageQueries & IThemeStorageMutations;

const scopedWindow = typeof window !== 'undefined' ? window : undefined;

const ThemeStorageInitialState: IThemeStorageQueries = {
  theme: scopedWindow
    ? scopedWindow.matchMedia('(prefers-color-scheme: dark)').matches
      ? Theme.DARK
      : Theme.LIGHT
    : Theme.LIGHT,
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
      resetTheme: () => set(ThemeStorageInitialState),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => ChromeLocalStorage),
      partialize: state => ({ theme: state.theme }),
    },
  ),
);

export const themeStorage = createSelectors(ThemeStorage);
