export const LumenSpinner = () => {
  return (
    <img
      className="w-15 h-16 animate-[spin_1.7s_cubic-bezier(0.22,0.61,0.36,1)_infinite] dark:filter dark:grayscale dark:brightness-0 dark:invert"
      src={chrome.runtime.getURL('popup/logo-alone.svg')}
      alt="spinner"
    />
  );
};
