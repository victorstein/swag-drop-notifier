import type { IProduct, IRawProduct } from './shared-types';

export const parseProductData = (data: IRawProduct[]): IProduct[] => {
  const parsedData = data.map(({ id, title, variants, images, handle, created_at }) => {
    const parsedVariants = variants.map(({ title: variantTitle, price, id }) => ({ title: variantTitle, price, id }));
    const parsedImages = images.map(({ id, src, width, height }) => ({ id, src, width, height }));
    const wasAddedLessThan24HoursAgo = Date.now() - new Date(created_at).getTime() < 24 * 60 * 60 * 1000;

    return {
      title,
      id,
      variants: parsedVariants,
      images: parsedImages,
      handle,
      new: wasAddedLessThan24HoursAgo,
      createdAt: created_at,
    };
  });

  return parsedData;
};
