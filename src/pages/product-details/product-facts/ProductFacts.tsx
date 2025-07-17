import Button from '@/components/ui/button';
import type { Product } from '@/schemas/form/productSchema';
import defaultProduct from '@/assets/svg/default-product.svg';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import ConfirmDialog from '@/components/ui/confirm-dialog/ConfirmDialog';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteProductMutation } from '@/hooks/services/useDeleteProductMutation';
import { useNavigate } from 'react-router-dom';
import ProductsModal from '@/pages/products/products-modal/ProductsModal';
import { toast } from '@/lib/toast';
import { useProductFormStore } from '@/stores/useProductFormStore';

interface Props {
  product: Product;
}

export default function ProductFacts({ product }: Props) {
  const setProduct = useProductFormStore((state) => state.setProduct);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useDeleteProductMutation();

  function onProductMutationSuccess() {
    toast.success('Product deleted successfully');
    queryClient.invalidateQueries({ queryKey: ['product'] });
    navigate('/products');
  }

  const onProductMutationError = (error: Error) => {
    toast.error(error.message);
  };

  const onDelete = async () => {
    try {
      await mutateAsync(product.id);
      onProductMutationSuccess();
    } catch (error) {
      onProductMutationError(error as Error);
    }
  };

  const onEdit = () => setProduct(product);

  return (
    <section className="mb-16 flex w-full max-w-4/5 gap-x-32 px-24 py-16 max-lg:flex-col max-sm:max-w-full">
      <div className="h-[36rem] w-full max-w-[36rem] max-lg:mb-24 max-lg:self-center max-md:h-[32rem] max-md:max-w-[32rem] max-sm:h-[28rem] max-sm:max-w-[28rem]">
        <ImageWithFallback
          src={product.imageUrl}
          alt={product.name}
          fallback={defaultProduct}
          className="h-full w-full rounded-md object-cover"
        />
      </div>
      <div className="flex w-full flex-col justify-between gap-12">
        <div className="flex flex-col items-end gap-8">
          <h2 className="text-2xl font-medium">{product.name}</h2>
          <h3 className="text-gray text-xl font-medium">{product.category}</h3>
        </div>
        <div className="">
          {product.attributes.length ? (
            <>
              <h3 className="py-8 text-lg font-semibold">Details</h3>
              <ul>
                {product.attributes.map((att) => (
                  <li
                    key={att.name}
                    className="border-gray border-t py-8 text-base"
                  >{`${att.name}: ${att.value}`}</li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
        <div className="flex justify-end gap-16">
          <ConfirmDialog
            title="Delete Product"
            description={`Are you sure you want to delete ${product.name}? This action cannot be undone`}
            onConfirm={onDelete}
            isPending={isPending}
          >
            <Button variant="cancel">Delete</Button>
          </ConfirmDialog>

          <ProductsModal>
            <Button onClick={onEdit}>Edit</Button>
          </ProductsModal>
        </div>
      </div>
    </section>
  );
}
