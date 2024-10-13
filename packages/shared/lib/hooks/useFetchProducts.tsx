import { authStorage } from '@extension/storage';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../network';
import { parseProductData } from '../utils';
import { useChromeBadge } from './useChromeBadge';

export const useFetchProducts = () => {
  const cookie = authStorage.use.authCookie();
  const { clearBadge } = useChromeBadge();
  clearBadge();

  chrome.cookies.set({
    url: 'https://shop.clevertech.biz',
    name: 'storefront_digest',
    value: cookie ?? '',
  });

  const {
    data: rawData = { products: [] },
    error,
    isLoading,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    refetchInterval: 10000,
  });

  const data = parseProductData(rawData.products);

  return { data, error, isLoading };
};
