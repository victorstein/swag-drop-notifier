import { MainLayout } from '@src/layouts/mainLayout';
import { createHashRouter, type RouteObject } from 'react-router-dom';
import Main from '../pages/main';
import { withLayout } from '@extension/shared';
import { AuthenticatedRoute } from '@extension/ui';
import { Login } from '@src/pages/auth';
import { loadAsyncStores } from '@extension/storage/lib/utils';

const routerDefinition: RouteObject[] = [
  {
    path: '/',
    element: <AuthenticatedRoute component={<Main />} />,
    loader: (): Promise<null> => loadAsyncStores,
  },
  {
    path: '/auth',
    element: <Login />,
  },
];

const addLayoutRecursively = (routerDefinition: RouteObject[]) => {
  return routerDefinition.map((route: RouteObject) => {
    if (route.children) {
      route.children = addLayoutRecursively(route.children);
    }

    if (!route.element) {
      return route;
    }

    return {
      ...route,
      element: withLayout(route.element, MainLayout),
    };
  });
};

export const router = createHashRouter(addLayoutRecursively(routerDefinition));
