import type { ComponentPropsWithoutRef, FC } from 'react';
import { cn } from '../utils';

export interface TextProps extends ComponentPropsWithoutRef<'h1'> {
  children: string;
}

const Title: FC<TextProps> = props => {
  return (
    <h1 className={cn(props.className, 'text-3xl font-bold text-title dark:text-title-dark mb-3')} {...props}>
      {props.children}
    </h1>
  );
};

export const Text = {
  Title,
};
