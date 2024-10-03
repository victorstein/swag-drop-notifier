import { authStorage } from '@extension/storage';
import type { FC } from 'react';
import { Navigate } from 'react-router-dom';

export interface AuthenticatedRouteProps {
  component: React.ReactNode;
}

export const AuthenticatedRoute: FC<AuthenticatedRouteProps> = ({ component, ...rest }) => {
  const isAuth = authStorage.use.isAuth();

  if (!isAuth) {
    return <Navigate to="/auth" />;
  }

  return <div {...rest}>{component}</div>;
};
