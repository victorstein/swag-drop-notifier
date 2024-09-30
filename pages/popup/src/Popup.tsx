import '@src/Popup.css';
import { animatedLazy, useTheme, withErrorBoundary, withSuspense } from '@extension/shared';
import { LoadingScreen } from '@extension/ui';

const LazyMain = animatedLazy(() => import('./pages/main'));

const Popup = () => {
  useTheme();

  return <LazyMain />;
};

export default withErrorBoundary(withSuspense(Popup, <LoadingScreen />), <div> Error Occur </div>);
