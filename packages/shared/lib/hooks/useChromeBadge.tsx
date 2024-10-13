export const useChromeBadge = () => {
  const setBadge = (count: number) => {
    chrome.action.setBadgeBackgroundColor({ color: '#ebff00' }, () => {
      chrome.action.setBadgeText({ text: count.toString() });
    });
  };

  const clearBadge = () => {
    chrome.action.setBadgeText({ text: '' });
  };

  return {
    clearBadge,
    setBadge,
  };
};
