import { useParams } from 'react-router-dom';
import ProductFacts from './product-facts/ProductFacts';
import ProductStock from './ProductStock';
import { useQueryClient } from '@tanstack/react-query';
import { useVisibleProductsByUser } from '@/hooks/services/useVisibleProductsByUser';
import ErrorElement from '@/components/ui/ErrorElement';
import Loading from '@/components/ui/Loading';

export default function ProductDetails() {
  const { productId } = useParams<{ productId: string }>();
  const { data, isPending, error } = useVisibleProductsByUser();
  const product = data?.visibleProductsByUser.find(
    (prod) => prod.id === productId,
  );

  const queryClient = useQueryClient();
  const onRetry = () =>
    queryClient.invalidateQueries({ queryKey: ['products'] });

  return (
    <main className="flex flex-col items-center">
      <section className="w-full max-w-4/5 px-8 py-16 max-sm:max-w-full">
        <h1 className="p-16 text-3xl font-bold text-nowrap max-sm:text-2xl">
          Product Details
        </h1>
      </section>
      {isPending && (
        <div className="mt-64 flex w-full flex-1 items-center justify-center">
          <Loading />
        </div>
      )}
      {error && <ErrorElement message={error?.message} onRetry={onRetry} />}
      {product && (
        <>
          <ProductFacts product={product} />
          <ProductStock
            stockByUse={product.stockByUse}
            minimumStock={product.minimumStock}
          />
        </>
      )}
    </main>
  );
}
