import { ThemeStorage } from '@extension/storage';

export async function toggleTheme() {
  console.log('initial theme:', ThemeStorage.getState().theme);
  ThemeStorage.getState().toggleTheme();
  console.log('toggled theme:', ThemeStorage.getState().theme);
}
