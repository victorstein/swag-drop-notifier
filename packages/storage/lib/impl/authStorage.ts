import { createSelectors, chromeLocalStorage } from '../utils';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface IAuthStorageQueries {
  authCookie: string | null;
  isStoreHydrated: boolean;
}

export interface IAuthStorageMutations {
  setAuthCookie: (authCookie: string) => void;
  resetAuthStore: () => void;
  setStoreHydrated: (isStoreHydrated: boolean) => void;
}

export interface IAuthStorage extends IAuthStorageQueries, IAuthStorageMutations {}

const AuthStorageInitialState: IAuthStorageQueries = {
  authCookie: null,
  isStoreHydrated: false,
};

export const AuthStorage = create<IAuthStorage>()(
  persist(
    set => ({
      ...AuthStorageInitialState,
      setAuthCookie: (authCookie: string) => set({ authCookie }),
      resetAuthStore: () => set(AuthStorageInitialState),
      setStoreHydrated: (isStoreHydrated: boolean) => set({ isStoreHydrated }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => chromeLocalStorage),
      partialize: state => ({ authCookie: state.authCookie }),
      onRehydrateStorage: state => {
        return () => state.setStoreHydrated(true);
      },
    },
  ),
);

export const authStorage = createSelectors(AuthStorage);
