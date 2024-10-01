import { createSelectors } from '../utils';
import { create } from 'zustand';
import { addChromeStore } from '../utils/add-chorme-store-support';

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

const ThemeStorageInitialState: IThemeStorageQueries = {
  theme: window.window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT,
};

export const ThemeStorage = create<IThemeStorage>()(
  addChromeStore(set => ({
    ...ThemeStorageInitialState,
    setTheme: (theme: Theme) => set({ theme }),
    toggleTheme: () => set(state => ({ theme: state.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT })),
    resetTheme: () => set(ThemeStorageInitialState),
  })),
);

export const themeStorage = createSelectors(ThemeStorage);
