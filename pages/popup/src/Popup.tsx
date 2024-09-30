import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { LoadingScreen } from './components/suspense';
import { animatedLazy } from './helpers/animatedLazy';

const LazyMain = animatedLazy(() => import('./pages/main'));

const Popup = () => {
  return <LazyMain />;
};

export default withErrorBoundary(withSuspense(Popup, <LoadingScreen />), <div> Error Occur </div>);
