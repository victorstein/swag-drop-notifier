import { AuthStorage, ThemeStorage } from '../impl';

const checkIfStoresAreHydrated = () => {
  if (typeof chrome === 'undefined') {
    return true;
  }

  const hydrationArray = [ThemeStorage.getState().isStoreHydrated, AuthStorage.getState().isStoreHydrated];
  const areStoresHydrated = hydrationArray.every(storeHydrated => storeHydrated === true);

  return areStoresHydrated;
};

export const loadAsyncStores: Promise<null> = new Promise(resolve => {
  const minimumLoadingTime = 1000;
  let elapsedMilliseconds = 0;

  const interval = setInterval(() => {
    if (checkIfStoresAreHydrated() && elapsedMilliseconds >= minimumLoadingTime) {
      clearInterval(interval);
      resolve(null);
    }

    elapsedMilliseconds += 100;
  }, 100);
});
