import { themeStorage } from '@extension/storage';
import { Button } from '@extension/ui';

const Main = () => {
  return (
    <div className="flex flex-col p-4 items-center justify-center">
      <div>Main Content</div>
      <div>
        <Button onClick={themeStorage.toggle}>Toggle Theme</Button>
      </div>
    </div>
  );
};

export default Main;
