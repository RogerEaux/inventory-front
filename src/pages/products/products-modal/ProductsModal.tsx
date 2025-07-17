import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { type PropsWithChildren } from 'react';
import ProductsForm from '../products-form/ProductsForm';
import { useProductFormStore } from '@/stores/useProductFormStore';

export default function ProductsModal({ children }: PropsWithChildren) {
  const product = useProductFormStore((state) => state.product);
  const isEdit = !!product;

  return (
    <Dialog modal>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-white px-48 py-36" aria-describedby="">
        <DialogHeader>
          <DialogTitle asChild className="mb-24">
            <h2 className="text-2xl font-medium">
              {isEdit ? 'Edit Product' : 'Add Product'}
            </h2>
          </DialogTitle>
        </DialogHeader>
        <ProductsForm />
      </DialogContent>
    </Dialog>
  );
}
