import SearchBar from '@/components/ui/SearchBar';
import ProductList from '../ProductList';
import { useSearchSync } from '@/hooks/utils/useSearchSync';
import { productsData } from './productsData';
import type { ProductPreview } from '@/schemas/form/productSchema';

export default function ProductSearch() {
  const { inputValue, setInputValue, debouncedValue } = useSearchSync();

  const mappedProducts: ProductPreview[] = productsData.map((prod) => {
    const stockQuantity = prod.stockByUse.reduce(
      (acc, curr) => acc + curr.quantity,
      0,
    );
    return { ...prod, stockQuantity };
  });
  const filteredProducts = mappedProducts.filter(({ name }) =>
    name.toLowerCase().includes(debouncedValue.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-32 p-16">
      <SearchBar value={inputValue} onChange={setInputValue} />
      <ProductList products={filteredProducts} />
    </div>
  );
}
