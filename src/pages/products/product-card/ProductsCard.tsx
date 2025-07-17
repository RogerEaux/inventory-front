import defaultProduct from '@/assets/svg/default-product.svg';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import type { ProductPreview } from '@/schemas/form/productSchema';

export default function ProductCard({
  name,
  imageUrl,
  category,
  stockQuantity,
  minimumStock,
}: ProductPreview) {
  const stockIndicator =
    stockQuantity <= minimumStock
      ? 'bg-stock-red'
      : stockQuantity <= minimumStock * 2
        ? 'bg-stock-yellow'
        : 'bg-stock-green';

  return (
    <article className="flex w-full max-w-[20rem] flex-col gap-4">
      <ImageWithFallback
        src={imageUrl}
        alt={name}
        fallback={defaultProduct}
        className="mb-12 h-[16rem] w-full rounded-md object-cover"
      />
      <h2 className="text-base font-medium">{name}</h2>
      <div className="mt-auto flex items-center gap-12">
        <div
          data-testid="stock-indicator"
          className={`h-16 w-16 rounded-full ${stockIndicator}`}
        ></div>
        <p className="text-sm">In stock: {stockQuantity}</p>
      </div>
      <p className="text-sm">{category}</p>
    </article>
  );
}
