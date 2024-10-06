import { Fade, ThemeSwitcher } from '@extension/ui';
import { AnimatePresence, motion } from 'framer-motion';
import React, { type FC } from 'react';

export interface MainLayoutProps {
  children: JSX.Element;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const logo = 'popup/logo.svg';

  return (
    <div className="flex h-screen w-screen flex-col p-4 items-start justify-start bg-background dark:bg-background-dark">
      <Fade className="flex w-full items-center justify-between">
        <div className="max-w-36">
          <img className="filter grayscale dark:invert brightness-0" src={chrome.runtime.getURL(logo)} alt="logo" />
        </div>
        <div>
          <ThemeSwitcher />
        </div>
      </Fade>
      <AnimatePresence>
        <motion.div
          className="flex flex-col flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0 }}>
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
