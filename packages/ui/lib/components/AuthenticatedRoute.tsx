import { useIsAuth } from '@extension/shared';
import type { FC } from 'react';
import { Navigate } from 'react-router-dom';

export interface AuthenticatedRouteProps {
  component: React.ReactNode;
}

export const AuthenticatedRoute: FC<AuthenticatedRouteProps> = ({ component }) => {
  const isAuth = useIsAuth();

  if (!isAuth) {
    return <Navigate to="/auth" />;
  }

  return <>{component}</>;
};
