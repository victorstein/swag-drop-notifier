import { type ComponentPropsWithoutRef } from 'react';
import { themeStorage } from '../../../../../packages/storage';

const ToggleButton = (props: ComponentPropsWithoutRef<'button'>) => {
  return (
    <button
      className={
        props.className +
        ' ' +
        'font-bold mt-4 py-1 px-4 rounded shadow hover:scale-105 bg-primary text-white shadow-black dark:bg-primary-dark'
      }
      onClick={themeStorage.toggle}>
      {props.children}
    </button>
  );
};

const Main = () => {
  return (
    <div className="flex flex-col p-4 items-center justify-center">
      <div>Main Content</div>
      <div>
        <ToggleButton>Toggle Theme</ToggleButton>
      </div>
    </div>
  );
};

export default Main;
