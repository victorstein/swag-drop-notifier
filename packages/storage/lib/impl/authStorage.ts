import { createSelectors } from '../utils';
import { create } from 'zustand';
import { ChromeLocalStorage } from 'zustand-chrome-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface IAuthStorageQueries {
  isAuth: boolean;
}

export interface IAuthStorageMutations {
  setAuth: (isAuth: boolean) => void;
}

export interface IAuthStorage extends IAuthStorageQueries, IAuthStorageMutations {}

const AuthStorageInitialState: IAuthStorageQueries = {
  isAuth: false,
};

export const AuthStorage = create<IAuthStorage>()(
  persist(
    set => ({
      ...AuthStorageInitialState,
      setAuth: (isAuth: boolean) => set({ isAuth }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => ChromeLocalStorage),
      partialize: state => ({ isAuth: state.isAuth }),
    },
  ),
);

export const authStorage = createSelectors(AuthStorage);
