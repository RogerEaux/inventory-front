import { useParams } from 'react-router-dom';
import { productsData } from '../products/product-search/productsData';
import ProductFacts from './ProductFacts';
import ProductStock from './ProductStock';

export default function ProductDetails() {
  const { productId } = useParams<{ productId: string }>();
  const productData = productsData.find((prod) => prod.id === productId)!;

  return (
    <main className="flex flex-col items-center">
      <section className="w-full max-w-4/5 px-8 py-16 max-sm:max-w-full">
        <h1 className="p-16 text-3xl font-bold text-nowrap max-sm:text-2xl">
          Product Details
        </h1>
      </section>
      <ProductFacts {...productData} />
      <ProductStock
        stockByUse={productData.stockByUse}
        minimumStock={productData.minimumStock}
      />
    </main>
  );
}
