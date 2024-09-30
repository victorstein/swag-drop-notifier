import type { FC, JSXElementConstructor, ReactElement, ReactNode } from 'react';

type RouterComponent = ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode>;
type ComponentWithLayout = string | number | true | (RouterComponent & { layout?: FC });

export const withLayout = (Component: ComponentWithLayout, DefaultLayout: FC<{ children: JSX.Element }>) => {
  if (typeof Component === 'string' || typeof Component === 'number' || Component === true) {
    return (
      <DefaultLayout>
        <>{Component}</>
      </DefaultLayout>
    );
  }

  const Layout = Component.layout ?? DefaultLayout;

  const LayedoutComponent = () => {
    return (
      <Layout>
        <>{Component}</>
      </Layout>
    );
  };

  return LayedoutComponent();
};
