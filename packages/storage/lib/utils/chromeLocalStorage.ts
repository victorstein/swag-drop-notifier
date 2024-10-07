import type { StateStorage } from 'zustand/middleware';
import type { Mutate, State, StoreApi, UseBoundStore } from 'zustand';

const chrome = globalThis.chrome;

type StoreWithPersist = Mutate<StoreApi<State>, [['zustand/persist', unknown]]>;

export const withChromeStorageEvents = <S extends UseBoundStore<StoreApi<object>>>(_store: S) => {
  const store = _store as S & StoreWithPersist;

  if (!store.persist) {
    return;
  }

  const storeName = store.persist.getOptions().name;
  const storageEventCallback = (changes: Record<string, chrome.storage.StorageChange>) => {
    if (storeName && changes[storeName] && changes[storeName].newValue) {
      store.persist.rehydrate();
    }
  };

  chrome?.storage.onChanged.addListener(storageEventCallback);
};

export const chromeLocalStorage: StateStorage = {
  getItem: name => {
    return new Promise<string>((resolve, reject) => {
      chrome?.storage.local.get(name, (result: Record<string, string>) => {
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError);
        }
        resolve(result[name]);
      });
    });
  },
  setItem: (name, value) => {
    return new Promise<void>((resolve, reject) => {
      chrome?.storage.local.set({ [name]: value }, () => {
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError);
        }
        resolve();
      });
    });
  },
  removeItem: name => {
    return new Promise<void>((resolve, reject) => {
      chrome?.storage.local.remove(name, () => {
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError);
        }
        resolve();
      });
    });
  },
};
