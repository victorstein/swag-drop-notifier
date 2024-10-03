import { useIntersection } from '@extension/shared';
import { type HTMLMotionProps, motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

enum Direction {
  fromLeft = 'fromLeft',
  fromRight = 'fromRight',
  fromTop = 'fromTop',
  fromBottom = 'fromBottom',
}

interface FadeProps extends HTMLMotionProps<'div'> {
  fromLeft?: boolean;
  fromRight?: boolean;
  fromTop?: boolean;
  fromBottom?: boolean;
  delay?: number;
  children: React.ReactNode;
}

const useFadeDirection = (direction: Direction) => {
  const defaultOffset = 20;
  const axis = direction === 'fromLeft' || direction === 'fromRight' ? 'x' : 'y';
  const sign = direction === 'fromLeft' || direction === 'fromTop' ? -1 : 1;
  const offset = sign * defaultOffset;

  return { axis, offset };
};

export const Fade = ({ className, children, delay, fromBottom, fromLeft, fromRight, fromTop, ...props }: FadeProps) => {
  const variants = { fromBottom, fromLeft, fromRight, fromTop };
  // Check if we received any direction props
  const direction = (Object.keys(variants) as Direction[]).find(key => key in Direction) || Direction.fromLeft;
  const { axis, offset } = useFadeDirection(direction);
  const control = useAnimation();
  const { ref, entry } = useIntersection();

  const animation = {
    visible: {
      opacity: 1,
      [axis]: 0,
    },
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.1,
      },
      [axis]: offset,
    },
  };

  useEffect(() => {
    if (entry?.isIntersecting) {
      control.start('visible');
    }
  }, [entry, control]);

  return (
    <motion.div
      ref={ref}
      variants={animation}
      initial="hidden"
      animate={control}
      transition={{
        delay: delay || 0,
      }}
      className={`${className || ''}`}
      {...props}>
      {children}
    </motion.div>
  );
};
