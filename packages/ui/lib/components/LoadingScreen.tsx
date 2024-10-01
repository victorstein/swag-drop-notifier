import { motion, cubicBezier, easeInOut } from 'framer-motion';

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
        delay: 1.2,
      }}
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
        }}
      />
      <img src={chrome.runtime.getURL(logo)} className="filter grayscale brightness-0 invert" alt="logo" />
    </motion.div>
  );
};
