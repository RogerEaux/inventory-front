import { FormProvider, useForm } from 'react-hook-form';
import DonutLegend from './DonutLegend';
import Button from '../button';
import {
  stockValueSchema,
  type StockValue,
} from '@/schemas/form/stockValueSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Entry } from './DonutChart';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUpdateProductStockMutation } from '@/hooks/services/useUpdateProductStockMutation';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/lib/toast';

interface Props {
  entries: Entry[];
  columnNames?: { name: string; value: string };
}

export default function DonutValueForm({ entries, columnNames }: Props) {
  const { productId } = useParams<{ productId: string }>();
  const [hasStockChanged, setHasStockChanged] = useState(false);

  const defaultValues = {
    updates: entries.reduce(
      (acc, item) => {
        acc[item.name] = item.value;
        return acc;
      },
      {} as Record<string, number>,
    ),
  };

  const form = useForm<StockValue>({
    resolver: zodResolver(stockValueSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onChange = () => setHasStockChanged(true);

  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useUpdateProductStockMutation();

  function onStockMutationSuccess() {
    setHasStockChanged(false);
    const message = 'Stock updated successfully';
    toast.success(message);
    queryClient.invalidateQueries({ queryKey: ['products'] });
  }

  function onStockMutationError(error: Error) {
    setHasStockChanged(false);
    toast.error(error.message);
  }

  async function onValidSubmit(data: StockValue) {
    const updates = data.updates;

    try {
      for (const { name, value: currentValue } of entries) {
        const newValue = updates[name];
        const delta = newValue - currentValue;

        if (delta !== 0) {
          await mutateAsync({
            productId: productId ?? '',
            useType: name,
            quantity: delta,
          });
        }
      }
      onStockMutationSuccess();
    } catch (error) {
      onStockMutationError(error as Error);
    }
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onValidSubmit)}
        className="flex w-full max-w-[30rem] flex-col gap-8"
        aria-label="Stock value form"
        noValidate
      >
        <DonutLegend
          entries={entries}
          columnNames={columnNames}
          onChange={onChange}
        />
        <div className="flex w-full items-center justify-end">
          {errors.updates ? (
            <p className="text-error mr-auto text-sm">
              {Object.values(errors.updates)[0]?.message}
            </p>
          ) : null}
          {hasStockChanged ? (
            <Button
              type="submit"
              className="px-12 py-8 text-sm"
              disabled={isPending}
            >
              Save
            </Button>
          ) : (
            <div className="h-[3.6rem] w-[5.4rem]"></div>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
