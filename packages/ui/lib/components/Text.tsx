import type { ComponentPropsWithoutRef, FC } from 'react';
import { cn } from '../utils';

export interface TitleProps extends ComponentPropsWithoutRef<'h1'> {
  children: string;
}

export interface ParagraphProps extends ComponentPropsWithoutRef<'p'> {
  children: string;
}

const Title: FC<TitleProps> = ({ className, ...props }) => {
  return (
    <h1
      className={cn('font-primary font-medium text-3xl font-bold text-title dark:text-title-dark mb-3', className)}
      {...props}>
      {props.children}
    </h1>
  );
};

const Paragraph: FC<ParagraphProps> = ({ className, ...props }) => {
  return (
    <p
      className={cn('font-primary font-normal text-base text-paragraph dark:text-paragraph-dark mb-4', className)}
      {...props}>
      {props.children}
    </p>
  );
};

export const Text = {
  Title,
  Paragraph,
};
