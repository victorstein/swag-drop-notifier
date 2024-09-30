import '@src/Popup.css';
import { withErrorBoundary } from '@extension/shared';
import { LoadingScreen } from '@extension/ui';

const Popup = () => {
  useTheme();
};

export default withErrorBoundary(withSuspense(Popup, <LoadingScreen />), <div> Error Occur </div>);
