import { createSelectors } from '../utils';
import { create } from 'zustand';

export interface IAppStorageQueries {
  isLoading: boolean;
}

export interface IAppStorageMutations {
  setIsLoading: (isLoading: boolean) => void;
}

export type IAppStorage = IAppStorageQueries & IAppStorageMutations;

const AppStorageInitialState: IAppStorageQueries = {
  isLoading: true,
};

export const AppStorage = create<IAppStorage>()(set => ({
  ...AppStorageInitialState,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));

export const appStorage = createSelectors(AppStorage);
