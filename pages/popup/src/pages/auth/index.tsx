import { authStorage } from '@extension/storage';
import { Button, Fade, Text } from '@extension/ui';
import { useCallback, useEffect, useState, type FC } from 'react';
import { useInterval } from 'usehooks-ts';

const Title = Text.Title;
const Paragraph = Text.Paragraph;
export interface LoginProps {}

export const Login: FC<LoginProps> = () => {
  const [interval, setInterval] = useState<number | null>(null);
  const setAuthCookie = authStorage.use.setAuthCookie();

  const redirectHandler = useCallback(() => {
    chrome.tabs.create({ url: 'https://shop.lumenalta.com' });
  }, []);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs[0].url?.includes('shop.lumenalta.com')) {
        setInterval(1000);
      } else {
        setInterval(null);
      }
    });
  }, []);

  useInterval(() => {
    chrome.cookies.get(
      {
        url: 'https://shop.lumenalta.com',
        name: 'storefront_digest',
      },
      cookie => {
        if (cookie) {
          setAuthCookie(cookie.value);
          chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            if (tabs[0].url?.includes('shop.lumenalta.com')) {
              chrome.tabs.remove(tabs[0].id!);
            }
          });
        }
      },
    );
  }, interval);

  if (interval !== null) {
    return (
      <div className="flex flex-1 items-start justify-center flex-col">
        <Fade fromTop delay={0.2}>
          <Title>Almost there!</Title>
        </Fade>
        <Fade fromTop delay={0.4} className="mb-6">
          <Paragraph>We are waiting for you to login to the Lumenalta store</Paragraph>
        </Fade>
        <Fade fromTop delay={0.6} className="flex w-full justify-center">
          <img
            className="w-16 h-16 animate-[spin_1.7s_cubic-bezier(0.22,0.61,0.36,1)_infinite] dark:filter dark:grayscale dark:brightness-0 dark:invert"
            src={chrome.runtime.getURL('popup/logo-alone.svg')}
            alt="spinner"
          />
        </Fade>
      </div>
    );
  }

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
