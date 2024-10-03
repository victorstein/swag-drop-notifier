import { themeStorage } from '@extension/storage';
import { LuMoonStar } from 'react-icons/lu';
import { FiSun } from 'react-icons/fi';
import type { FC } from 'react';

export const ThemeSwitcher: FC = () => {
  const toggleTheme = themeStorage.use.toggleTheme();
  const theme = themeStorage.use.theme();
  const toggleValue = theme === 'dark' ? true : false;

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className="peer sr-only opacity-0"
        id="toggle"
        onChange={toggleTheme}
        checked={toggleValue}
      />
      <label
        htmlFor="toggle"
        className="relative cursor-pointer flex h-6 w-11 items-center rounded-full bg-gray-400 outline-gray-400 transition-colors peer-checked:bg-background-primary peer-focus-visible:outline peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-background-primary">
        <span className="sr-only">Toggle theme</span>
      </label>
      <label
        htmlFor="toggle"
        className="absolute transform-colors flex items-center justify-center cursor-pointer rounded-full h-6 w-6 bg-white shadow-lg transition-transform duration-300 peer-checked:translate-x-full">
        {toggleValue ? <LuMoonStar className="text-title" /> : <FiSun className="text-title" />}
      </label>
    </div>
  );
};
