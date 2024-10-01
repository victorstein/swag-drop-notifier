import { themeStorage } from '@extension/storage';
import { Button, Text } from '@extension/ui';
import { MainLayout } from '@src/layouts/mainLayout';

const Title = Text.Title;

const Main = () => {
  const toggleTheme = themeStorage.use.toggleTheme();

  return (
    <div className="flex flex-col p-4 items-center justify-center">
      <Title>Main Content</Title>
      <div>
        <Button onClick={toggleTheme}>Toggle Theme</Button>
      </div>
    </div>
  );
};

Main.layout = MainLayout;

export default Main;
