import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '../utils';

export type ButtonProps = ComponentPropsWithoutRef<'button'>;

export function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        className,
        'py-1 px-4 rounded shadow hover:scale-105 bg-button text-white shadow-black dark:bg-button-dark',
      )}
      {...props}>
      {children}
    </button>
  );
}
