import { motion, easeInOut } from 'framer-motion';

export const LoadingScreen = () => {
  const logo = 'popup/logo.svg';

  return (
    <motion.div
      animate={{
        y: '-100%',
      }}
      transition={{
        easings: easeInOut,
        duration: 0.3,
        delay: 1.5,
      }}
      className={'flex justify-center items-center h-screen w-screen bg-primary absolute dark:bg-primary-dark'}>
      <motion.div
        className="absolute h-full w-full bg-primary z-10 dark:bg-primary-dark"
        initial={{
          x: '100%',
        }}
        animate={{
          x: '-100%',
        }}
        transition={{
          easings: easeInOut,
          duration: 1.5,
          repeat: Infinity,
        }}
      />
      <img src={chrome.runtime.getURL(logo)} className="filter grayscale brightness-0 invert" alt="logo" />
    </motion.div>
  );
};
