import '@src/Popup.css';
import { withErrorBoundary } from '@extension/shared';
import { LoadingScreen } from '@extension/ui';
import { router } from './router';
import { RouterProvider } from 'react-router-dom';

const Popup = () => {
  return <RouterProvider router={router} fallbackElement={<LoadingScreen />} />;
};

export default withErrorBoundary(withSuspense(Popup, <LoadingScreen />), <div> Error Occur </div>);
