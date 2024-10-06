import { Button, Fade, Text } from '@extension/ui';
import { useCallback, useEffect, type FC } from 'react';

const Title = Text.Title;
const Paragraph = Text.Paragraph;
export interface LoginProps {}

export const Login: FC<LoginProps> = () => {
  const redirectHandler = useCallback(() => {
    chrome.tabs.create({ url: 'https://shop.lumenalta.com' });
  }, []);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs[0].url?.includes('shop.lumenalta.com')) {
        console.log('We are at the shop');
      }
    });
  }, []);

  return (
    <div className="flex flex-1 items-start justify-center flex-col">
      <Fade fromTop delay={0.2}>
        <Title>Hey there!</Title>
      </Fade>
      <Fade fromTop delay={0.4}>
        <Paragraph>
          We noticed that we don&apos;t have the neccesary credentials to access the products in the Lumenalta store.
          Please click the button below to go there and login.
        </Paragraph>
      </Fade>
      <Fade delay={0.6} fromTop className="w-full flex justify-center mb-4">
        <Button onClick={redirectHandler}>Go to the shop</Button>
      </Fade>
      <Fade fromTop delay={0.8}>
        <Paragraph className="text-center text-sm">
          Once logged in, we don&apos;t have to do this process again
        </Paragraph>
      </Fade>
    </div>
  );
};
