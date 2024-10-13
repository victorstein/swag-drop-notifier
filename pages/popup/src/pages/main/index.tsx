import { useFetchProducts } from '@extension/shared';
import { authStorage } from '@extension/storage';
import { Fade, LumenSpinner, Product, Text } from '@extension/ui';
import { MainLayout } from '@src/layouts/mainLayout';

const { Title, Paragraph } = Text;

const Main = () => {
  const { data, error, isLoading } = useFetchProducts();
  const resetAuthStorage = authStorage.use.resetAuthStore();

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <LumenSpinner />
      </div>
    );
  }

  if (error) {
    setTimeout(() => {
      resetAuthStorage();
    }, 5000);

    return (
      <div className="flex flex-1 items-center justify-center flex-col">
        <Title className="text-center">Error:</Title>
        <Paragraph className="text-center">
          {error?.message ?? 'There was an error while fetching the products. Please try again later.'}
        </Paragraph>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap mb-4">
      {data.map((product, index) => (
        <Fade key={product.id} className="w-[130px] flex h-52 mb-2 odd:mr-2" delay={index < 6 ? 0.2 * index : 0.2}>
          <Product product={product} />
        </Fade>
      ))}
    </div>
  );
};

Main.layout = MainLayout;

export default Main;
