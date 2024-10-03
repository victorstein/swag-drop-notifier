import { ThemeSwitcher } from '@extension/ui';
import { AnimatePresence, motion } from 'framer-motion';
import React, { type FC } from 'react';

export interface MainLayoutProps {
  children: JSX.Element;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-screen flex-col p-4 items-start justify-start bg-background dark:bg-background-dark">
      <div className="flex w-full justify-end">
        <ThemeSwitcher />
      </div>
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
