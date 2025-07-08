import Input from '@/components/ui/input';
import Label from '@/components/ui/Label';
import { productSchema, type Product } from '@/schemas/form/productSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { categoryOptions } from './categoryOptions';
import SelectInput from '@/components/ui/SelectInput';
import { useProductFormStore } from '@/stores/useProductFormStore';
import { useRef } from 'react';
import { FormButtons } from '@/components/ui/form/FormButtons';
import PairInput from '@/components/ui/PairInput';
import ImageInput from '@/components/ui/ImageInput';
import { useAuthStore } from '@/stores/useAuthStore';

export default function ProductsForm() {
  const department = useAuthStore((state) => state.department) ?? 'SWAG';
  const product = useProductFormStore((state) => state.product);
  const closeRef = useRef<HTMLButtonElement>(null);

  const defaultValues: Product = {
    name: product?.name ?? '',
    category: product?.category ?? '',
    minimumStock: product?.minimumStock ?? 0,
    imageUrl: product?.imageUrl ?? '',
    attributes: product?.attributes ?? [],
    stockByUse: product?.stockByUse ?? [{ useType: 'GENERAL', quantity: 0 }],
  };

  const form = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  function onValidSubmit(data: Product) {
    console.log('Form submitted:', data);
    closeRef.current?.click();
  }

  register('imageUrl');

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

          <ImageInput name="imageUrl" />

          <PairInput
            title="Stock"
            name="stockByUse"
            pairKey={{
              title: 'Type',
              name: 'useType',
              type: 'text',
              isDisabled: (field) => field.useType === 'GENERAL',
            }}
            pairValue={{
              title: 'Quantity',
              name: 'quantity',
              type: 'number',
            }}
            isRemovable={(field) => field.useType === 'GENERAL'}
          />

          <PairInput
            title="Attributes"
            name="attributes"
            pairKey={{ title: 'Name', name: 'name', type: 'text' }}
            pairValue={{ title: 'Value', name: 'value', type: 'text' }}
          />
        </div>

        <FormButtons isPending={false} ref={closeRef} />
      </form>
    </FormProvider>
  );
}
