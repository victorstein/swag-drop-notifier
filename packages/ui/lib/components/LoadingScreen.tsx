import { motion, cubicBezier } from 'framer-motion';

export const LoadingScreen = () => {
  const logo = 'popup/logo.svg';

  return (
    <div
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
          duration: 0.8,
          delay: 0.2,
          repeat: Infinity,
          repeatDelay: 0.4,
        }}
      />
      <img src={chrome.runtime.getURL(logo)} className="filter grayscale brightness-0 invert" alt="logo" />
    </div>
  );
};
