import { themeStorage } from '@extension/storage';

export async function toggleTheme() {
  console.log('initial theme:', await themeStorage.get());
  await themeStorage.toggle();
  console.log('toggled theme:', await themeStorage.get());
}
