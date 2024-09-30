import { createRoot } from 'react-dom/client';
import '@src/index.css';
import '@extension/ui/dist/global.css';
import Popup from '@src/Popup';
import { useTheme } from '@extension/shared';

const ThemedPopup = () => {
  useTheme();
  return <Popup />;
};

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);

  root.render(<ThemedPopup />);
}

init();
