import { appStorage } from '@extension/storage';
import { motion, cubicBezier, easeInOut, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

export const LoadingScreen = () => {
  const isAppLoading = appStorage.use.isLoading();
  const logo = 'popup/logo.svg';
  const control = useAnimation();

  const animation = {
    visible: {
      y: 0,
    },
    hidden: {
      y: '-100%',
      transition: {
        duration: 0.3,
      },
    },
  };

  useEffect(() => {
    if (isAppLoading === false) {
      control.start('hidden');
    }
  }, [isAppLoading, control]);

  return (
    <motion.div
      transition={{
        easings: easeInOut,
      }}
      variants={animation}
      initial="visible"
      animate={control}
      className={
        'flex justify-center items-center h-screen w-screen bg-background-primary absolute dark:bg-background-primary-dark'
      }>
      <motion.div
        className="absolute h-full w-full bg-background-primary z-10 dark:bg-background-primary-dark"
        initial={{
          x: '100%',
        }}
        animate={{
          x: '-100%',
        }}
        transition={{
          easings: cubicBezier(0.83, 0, 0.17, 1),
          duration: 1,
          delay: 0.2,
          repeat: Infinity,
          repeatDelay: 0.4,
        }}
      />
      <img src={chrome.runtime.getURL(logo)} className="filter grayscale brightness-0 invert" alt="logo" />
    </motion.div>
  );
};
