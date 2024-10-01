import { themeStorage } from '@extension/storage';
import { Button, Text } from '@extension/ui';
import { MainLayout } from '@src/layouts/mainLayout';

const Title = Text.Title;

const Main = () => {
  return (
    <div className="flex flex-col p-4 items-center justify-center">
      <Title>Main Content</Title>
      <div>
        <Button onClick={themeStorage.toggle}>Toggle Theme</Button>
      </div>
    </div>
  );
};

Main.layout = MainLayout;

export default Main;
