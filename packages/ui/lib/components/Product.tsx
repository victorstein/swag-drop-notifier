import type { IProduct } from '@extension/shared';
import clsx from 'clsx';
import Carousel from 'framer-motion-carousel';

export const Product = ({ product }: { product: IProduct }) => {
  const handleProductClick = () => {
    chrome.tabs.create({ url: `https://shop.lumenalta.com/products/${product.handle}` });
  };

  const navigationDots = ({
    activeIndex,
    setActiveIndex,
  }: {
    activeIndex: number;
    setActiveIndex: (index: number) => void;
  }) => {
    return (
      <div className="flex flex-row absolute bottom-1 w-full justify-center">
        {product.images.map((item, i) => (
          <div
            key={i}
            className={clsx('mx-1 rounded-full size-2 border border-background-secondary', {
              'bg-background-secondary': i === activeIndex,
            })}
            onClick={e => {
              e.stopPropagation();
              setActiveIndex(i);
            }}
            role="presentation"
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex overflow-hidden flex-1 pt-4 bg-background-dark bg-opacity-20 dark:bg-opacity-50 shadow-lg justify-between flex-col transition-transform duration-200">
      <div className="basis-3/5 grow overflow-hidden cursor-grab">
        <Carousel
          renderArrowLeft={() => null}
          renderArrowRight={() => null}
          renderDots={navigationDots}
          autoPlay={false}
          interval={5000}
          loop>
          {product.images.map((item, i) => (
            <img
              draggable="false"
              className="object-contain overflow-hidden max-h-full"
              src={item.src}
              key={i}
              width="100%"
              alt=""
            />
          ))}
        </Carousel>
      </div>
      <div className="basis-1/5 justify-center flex items-center" onClick={handleProductClick} role="presentation">
        <div className="rounded-full w-fit bg-background-primary font-primary font-base py-1 px-4 text-white hover:scale-105 cursor-pointer transition-transform duration-100">
          ${product.variants[0].price}
        </div>
      </div>
      <div className="basis-1/5 max-h-[25px] text-center justify-center px-4 bg-background-secondary text-black font-primary font-medium py-1 cursor-default">
        {product.title}
      </div>
      {product.new && (
        <div className="rounded-full absolute top-0 right-0 px-4 py-1 bg-background-secondary font-primary font-medium">
          New
        </div>
      )}
    </div>
  );
};
