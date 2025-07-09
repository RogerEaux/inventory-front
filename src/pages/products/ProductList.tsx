import type { ProductPreview } from '@/schemas/form/productSchema';
import ProductCard from './product-card/ProductsCard';
import { Link } from 'react-router-dom';

interface Props {
  products: ProductPreview[];
}

export default function ProductList({ products }: Props) {
  return (
    <div className="grid grid-cols-5 justify-items-center gap-x-16 gap-y-24 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2">
      {products.length === 0 ? (
        <p className="col-span-full text-center text-lg">No results</p>
      ) : (
        products.map((prod) => (
          <Link to={prod.id} key={prod.id}>
            <ProductCard {...prod} />
          </Link>
        ))
      )}
    </div>
  );
}
