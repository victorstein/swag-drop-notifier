import type { StateCreator, StoreMutatorIdentifier } from 'zustand';
import { checkIfChromeExist, excludeKeysAndFunctions, type ObjectType } from './helpers';

type ChromeStoreType = <
  T = unknown,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  f: StateCreator<T, Mps, Mcs>,
  keysToExclude?: string[],
) => StateCreator<T, Mps, Mcs>;

type ChromeImpl = <T = unknown>(f: StateCreator<T, [], []>, keysToExclude?: string[]) => StateCreator<T, [], []>;

const includeChromeStore_: ChromeImpl = (f, keysToExclude) => (set, get, store) => {
  checkIfChromeExist();

  const saveInChromeExtentionStorage: typeof set = (...a) => {
    // @ts-expect-error - Type not exported from zustand
    set(...a);
    chrome.storage.local.set(excludeKeysAndFunctions(store.getState() as ObjectType, keysToExclude));
  };

  store.setState = saveInChromeExtentionStorage;

  chrome.storage.local.get().then(obj => {
    // @ts-expect-error - Type not exported from zustand
    set(obj);
  });

  return f(saveInChromeExtentionStorage, get, store);
};

export const addChromeStore = includeChromeStore_ as unknown as ChromeStoreType;
