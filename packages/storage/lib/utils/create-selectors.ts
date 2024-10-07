import type { StoreApi, UseBoundStore } from 'zustand';
import { withChromeStorageEvents } from './chromeLocalStorage';

type WithSelectors<S> = S extends { getState: () => infer T } ? S & { use: { [K in keyof T]: () => T[K] } } : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(_store: S): WithSelectors<S> => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (const k of Object.keys(store.getState())) {
    (store.use as Record<string, unknown>)[k] = () => store(s => s[k as keyof typeof s]);
  }

  withChromeStorageEvents(store);

  return store;
};
