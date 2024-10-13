import 'webextension-polyfill';
import { fetchProducts, parseProductData } from '@extension/shared';
import { AuthStorage, ProductStorage } from '@extension/storage';

console.log('Background script running...');

AuthStorage.subscribe(({ authCookie }) => {
  if (authCookie) {
    console.log('Digest found');
    chrome.cookies.set({
      url: 'https://shop.lumenalta.com',
      name: 'storefront_digest',
      value: authCookie,
    });
    fetchInterval();
  }
  if (!authCookie) {
    console.log('No cookie found');
    clearInterval(fetchInterval());
  }
});

chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
  if (notificationId === 'new-product' && buttonIndex === 0) {
    chrome.tabs.create({ url: 'https://shop.lumenalta.com' });
  }
});

const fetchInterval = () =>
  setInterval(async () => {
    console.log('Fetching products...');
    const rawData = await fetchProducts();
    const parsedData = parseProductData(rawData.products);

    const productIdList = ProductStorage.getState().productIds;
    const setProductIdList = ProductStorage.getState().setProductIds;

    if (productIdList.length === 0) {
      console.log('setting the store initial state');
      setProductIdList(parsedData.map(({ id }) => `${id}`));
    } else {
      const newProductIds = parsedData.map(({ id }) => `${id}`).filter(id => !productIdList.includes(id));
      if (newProductIds.length > 0) {
        console.log('New products found!');
        chrome.action.setBadgeBackgroundColor({ color: '#ebff00' });
        chrome.action.setBadgeTextColor({ color: '#000000' });
        chrome.action.setBadgeText({ text: `${newProductIds.length}` });
        chrome.notifications.create('new-product', {
          type: 'basic',
          iconUrl: chrome.runtime.getURL('icon-128.png'),
          title: 'New products found!',
          message: `You have ${newProductIds.length} new products`,
          buttons: [{ title: 'View in the Lumenalta Store' }],
          priority: 2,
        });
      }

      setProductIdList([...productIdList, ...newProductIds]);
    }
  }, 10000);
