import { authStorage } from '@extension/storage';
import { Button, Fade, Text } from '@extension/ui';
import { MainLayout } from '@src/layouts/mainLayout';

const Title = Text.Title;

const Main = () => {
  const resetAuthStore = authStorage.use.resetAuthStore();

  return (
    <div className="flex flex-col items-start justify-start">
      <Fade delay={0.2}>
        <Title>Main Content</Title>
      </Fade>
      <Fade delay={0.4}>
        <Button onClick={resetAuthStore}>Logout</Button>
      </Fade>
    </div>
  );
};

Main.layout = MainLayout;

export default Main;
