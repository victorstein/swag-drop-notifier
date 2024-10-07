import { authStorage } from '@extension/storage';

export const useIsAuth = (): boolean => {
  const authCookie = authStorage.use.authCookie();

  return authCookie !== null;
};
