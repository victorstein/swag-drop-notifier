import { MainLayout } from '@src/layouts/mainLayout';
import { createHashRouter, type RouteObject } from 'react-router-dom';
import Main from '../pages/main';
import { withLayout } from '@extension/shared';

const routerDefinition: RouteObject[] = [
  {
    path: '/',
    element: <Main />,
    loader: async (): Promise<null> => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(null);
        }, 1500);
      });
    },
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
