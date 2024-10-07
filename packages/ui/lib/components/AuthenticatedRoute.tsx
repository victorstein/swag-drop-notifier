import { useIsAuth } from '@extension/shared';
import type { FC } from 'react';
import { Navigate } from 'react-router-dom';

export interface AuthenticatedRouteProps {
  component: React.ReactNode;
}

export const AuthenticatedRoute: FC<AuthenticatedRouteProps> = ({ component, ...rest }) => {
  const isAuth = useIsAuth();

  if (!isAuth) {
    return <Navigate to="/auth" />;
  }

  return <div {...rest}>{component}</div>;
};
