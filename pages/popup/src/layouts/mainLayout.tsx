import { Fade, ThemeSwitcher } from '@extension/ui';
import { AnimatePresence, motion } from 'framer-motion';
import React, { cloneElement, type FC } from 'react';
import { useLocation } from 'react-router-dom';

export interface MainLayoutProps {
  children: JSX.Element;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const logo = 'popup/logo.svg';
  const location = useLocation();

  return (
    <div className="flex h-screen w-screen flex-col p-4 items-start justify-start bg-background dark:bg-background-dark">
      <Fade fromTop className="flex w-full items-center justify-between mb-6">
        <div className="max-w-36">
          <img className="filter grayscale dark:invert brightness-0" src={chrome.runtime.getURL(logo)} alt="logo" />
        </div>
        <div>
          <ThemeSwitcher />
        </div>
      </Fade>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          className="flex flex-col flex-1 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0 }}>
          {cloneElement(children, { key: location.pathname })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
