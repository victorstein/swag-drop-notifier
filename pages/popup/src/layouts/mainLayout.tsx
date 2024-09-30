import { AnimatePresence, motion } from 'framer-motion';
import { type FC } from 'react';

export interface MainLayoutProps {
  children: JSX.Element;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-screen flex-col p-4 items-center justify-center bg-bg-primary dark:bg-bg-primary-dark">
      <AnimatePresence>
        <motion.div
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
