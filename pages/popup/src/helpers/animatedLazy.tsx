import { type ComponentType, lazy } from 'react';

export const animatedLazy = <T extends ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>,
  minLoadTimeMs = 2000,
) =>
  lazy(() =>
    Promise.all([factory(), new Promise(resolve => setTimeout(resolve, minLoadTimeMs))]).then(
      ([moduleExports]) => moduleExports,
    ),
  );
