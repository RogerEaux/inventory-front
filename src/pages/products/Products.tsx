import ProductSearch from './product-search/ProductsSearch';
import ProductsHeader from './products-header/ProductsHeader';

export default function Products() {
  return (
    <main className="flex flex-col items-center">
      <section className="w-full max-w-4/5 px-8 py-16 max-sm:max-w-full">
        <ProductsHeader />
        <ProductSearch />
      </section>
    </main>
  );
}
