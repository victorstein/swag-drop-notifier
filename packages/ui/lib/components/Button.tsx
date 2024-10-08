import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '../utils';
import { HiArrowRight } from 'react-icons/hi2';

export type ButtonProps = ComponentPropsWithoutRef<'button'>;

export function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-5 py-3 text-sm font-normal font-primary border border-black bg-button text-black dark:text-white dark:hover:text-black dark:hover:bg-button dark:bg-button-dark hover:bg-button-dark hover:text-white transition-colors duration-200',
        className,
      )}
      {...props}>
      <div className="flex justify-between items-center">
        <div className="mr-4">{children}</div>
        <div>
          <HiArrowRight size={20} />
        </div>
      </div>
    </button>
  );
}
