import { AppStorage, AuthStorage, ThemeStorage } from '../impl';

const checkIfStoresAreHydrated = () => {
  const hydrationArray = [ThemeStorage.getState().isStoreHydrated, AuthStorage.getState().isStoreHydrated];
  const areStoresHydrated = hydrationArray.every(storeHydrated => storeHydrated === true);

  return areStoresHydrated;
};

export const loadAsyncStores: Promise<null> = new Promise(resolve => {
  const minimumLoadingTime = 1500;
  let elapsedMilliseconds = 0;

  const interval = setInterval(() => {
    if (checkIfStoresAreHydrated() && elapsedMilliseconds >= minimumLoadingTime) {
      clearInterval(interval);
      AppStorage.setState({ isLoading: false });
      resolve(null);
    }

    elapsedMilliseconds += 100;
  }, 100);
});
