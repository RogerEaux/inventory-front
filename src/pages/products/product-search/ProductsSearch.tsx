import SearchBar from '@/components/ui/SearchBar';
import ProductList from '../ProductList';
import { useSearchSync } from '@/hooks/utils/useSearchSync';
import type { ProductPreview } from '@/schemas/form/productSchema';
import { useVisibleProductsByUser } from '@/hooks/services/useVisibleProductsByUser';
import { useQueryClient } from '@tanstack/react-query';
import { getTotalStockQuantity } from '@/lib/utils';
import Loading from '@/components/ui/Loading';
import ErrorElement from '@/components/ui/ErrorElement';

export default function ProductSearch() {
  const { inputValue, setInputValue, debouncedValue } = useSearchSync();
  const { data, isPending, error } = useVisibleProductsByUser();

  const mappedProducts: ProductPreview[] =
    data?.visibleProductsByUser.map((prod) => {
      const stockQuantity = getTotalStockQuantity(prod.stockByUse);
      return { ...prod, stockQuantity };
    }) ?? [];
  const filteredProducts = mappedProducts?.filter(
    ({ name, category }) =>
      name.toLowerCase().includes(debouncedValue.toLowerCase()) ||
      category.toLowerCase().includes(debouncedValue.toLowerCase()),
  );

  const queryClient = useQueryClient();
  const onRetry = () =>
    queryClient.invalidateQueries({ queryKey: ['products'] });

  if (isPending) {
    return (
      <div className="mt-64 flex w-full flex-1 items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <ErrorElement message={error?.message} onRetry={onRetry} />;
  }

  if (filteredProducts) {
    return (
      <div className="flex flex-col gap-32 p-16">
        <SearchBar value={inputValue} onChange={setInputValue} />
        <ProductList products={filteredProducts} />
      </div>
    );
  }
}
