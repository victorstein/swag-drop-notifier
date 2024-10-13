import { chromeLocalStorage, createSelectors } from '../utils';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface IProductStorageQueries {
  productIds: string[];
  isStoreHydrated: boolean;
}

export interface IProductStorageMutations {
  setProductIds: (products: string[]) => void;
  resetProductStore: () => void;
  setStoreHydrated: (isStoreHydrated: boolean) => void;
}

export interface IProductStorage extends IProductStorageQueries, IProductStorageMutations {}

const ProductStorageInitialState: IProductStorageQueries = {
  productIds: [],
  isStoreHydrated: false,
};

export const ProductStorage = create<IProductStorage>()(
  persist(
    set => ({
      ...ProductStorageInitialState,
      setProductIds: (productIds: string[]) => set({ productIds }),
      resetProductStore: () => set(ProductStorageInitialState),
      setStoreHydrated: (isStoreHydrated: boolean) => set({ isStoreHydrated }),
    }),
    {
      name: 'product-storage',
      storage: createJSONStorage(() => chromeLocalStorage),
      partialize: state => ({ productIds: state.productIds }),
      onRehydrateStorage: state => {
        return () => state.setStoreHydrated(true);
      },
    },
  ),
);

export const productStorage = createSelectors(ProductStorage);
