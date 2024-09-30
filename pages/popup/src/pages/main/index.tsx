import { themeStorage } from '@extension/storage';
import { Button } from '@extension/ui';
import { MainLayout } from '@src/layouts/mainLayout';

const Main = () => {
  return (
    <div className="flex flex-col p-4 items-center justify-center">
      <div className="pb-4">Main Content</div>
      <div>
        <Button onClick={themeStorage.toggle}>Toggle Theme</Button>
      </div>
    </div>
  );
};

Main.layout = MainLayout;

export default Main;
