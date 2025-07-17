import Input from '@/components/ui/input';
import Label from '@/components/ui/Label';
import {
  productSchema,
  productUpdateSchema,
  type ProductCreateForm,
  type ProductUpdateForm,
} from '@/schemas/form/productSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Controller,
  FormProvider,
  useForm,
  type FieldErrors,
} from 'react-hook-form';
import { categoryOptions } from './categoryOptions';
import SelectInput from '@/components/ui/SelectInput';
import { useProductFormStore } from '@/stores/useProductFormStore';
import { useRef } from 'react';
import { FormButtons } from '@/components/ui/form/FormButtons';
import PairInput from '@/components/ui/PairInput';
import ImageInput from '@/components/ui/ImageInput';
import { useAuthStore } from '@/stores/useAuthStore';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateProductMutation } from '@/hooks/services/useCreateProductMutation';
import { toast } from '@/lib/toast';
import { useUpdateProductMutation } from '@/hooks/services/useUpdateProductMutation';

export default function ProductsForm() {
  const department = useAuthStore((state) => state.department) ?? 'SWAG';
  const product = useProductFormStore((state) => state.product);
  const closeRef = useRef<HTMLButtonElement>(null);
  const isEdit = !!product;

  const schema = isEdit ? productUpdateSchema : productSchema;
  const defaultValues: ProductCreateForm | ProductUpdateForm = {
    name: product?.name ?? '',
    category: product?.category ?? '',
    minimumStock: product?.minimumStock ?? 0,
    fileBase64: product?.fileBase64 ?? '',
    attributes: product?.attributes ?? [],
    ...(isEdit ? {} : { stock: 1 }),
  };

  const form = useForm<ProductCreateForm | ProductUpdateForm>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  const queryClient = useQueryClient();
  const createProductMutation = useCreateProductMutation();
  const updateProductMutation = useUpdateProductMutation();

  const isPending =
    createProductMutation.isPending || updateProductMutation.isPending;

  function onProductMutationSuccess() {
    const message = isEdit
      ? 'Product updated successfully'
      : 'New product created successfully';
    toast.success(message);
    queryClient.invalidateQueries({ queryKey: ['products'] });
    closeRef.current?.click();
  }

  function onProductMutationError(error: Error) {
    toast.error(error.message);
    closeRef.current?.click();
  }

  function onValidSubmit(data: ProductCreateForm | ProductUpdateForm) {
    if (isEdit) {
      updateProductMutation.mutate(
        { ...data, id: product.id },
        {
          onSuccess: () => onProductMutationSuccess(),
          onError: (error) => onProductMutationError(error),
        },
      );
    } else {
      createProductMutation.mutate(data as ProductCreateForm, {
        onSuccess: () => onProductMutationSuccess(),
        onError: (error) => onProductMutationError(error),
      });
    }
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onValidSubmit)}
        aria-label="Product form"
        noValidate
      >
        <div className="col mb-40 grid w-full grid-cols-2 gap-32 max-md:grid-cols-1">
          <Label id="name" label="*Name" error={errors.name?.message ?? ''}>
            <Input
              autoComplete="name"
              id="name"
              placeholder="Name"
              {...register('name')}
            />
          </Label>

          <Label
            id="category"
            label="*Category"
            error={errors.category?.message ?? ''}
          >
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <SelectInput
                  id="category"
                  options={categoryOptions[department]}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select category"
                />
              )}
            />
          </Label>

          <Label
            id="minimumStock"
            label="*Minimum stock"
            error={errors.minimumStock?.message ?? ''}
          >
            <Input
              id="minimumStock"
              placeholder="Minimum stock"
              type="number"
              {...register('minimumStock', { valueAsNumber: true })}
            />
          </Label>

          {!isEdit && (
            <Label
              id="stock"
              label="*Stock"
              error={
                (errors as FieldErrors<ProductCreateForm>).stock?.message ?? ''
              }
            >
              <Input
                id="stock"
                placeholder="Stock"
                type="number"
                {...register('stock', { valueAsNumber: true })}
              />
            </Label>
          )}

          <ImageInput name="fileBase64" />

          <PairInput
            title="Attributes"
            name="attributes"
            pairKey={{ title: 'Name', name: 'name', type: 'text' }}
            pairValue={{ title: 'Value', name: 'value', type: 'text' }}
          />
        </div>

        <FormButtons isPending={isPending} ref={closeRef} />
      </form>
    </FormProvider>
  );
}
