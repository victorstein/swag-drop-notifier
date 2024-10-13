import '@src/Popup.css';
import { useChromeBadge, withErrorBoundary } from '@extension/shared';
import { LoadingScreen } from '@extension/ui';
import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';

const queryClient = new QueryClient();

const Popup = () => {
  const { clearBadge } = useChromeBadge();

  useEffect(() => {
    clearBadge();
  }, [clearBadge]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} fallbackElement={<LoadingScreen />} />
    </QueryClientProvider>
  );
};

export default withErrorBoundary(Popup, <div> Error Occur </div>);
