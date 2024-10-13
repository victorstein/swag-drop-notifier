import type { IRawProduct } from '../utils';

export const fetchProducts = async (): Promise<{ products: IRawProduct[] }> => {
  const response = await fetch('https://shop.lumenalta.com/products.json?limit=250&order=created_at', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
