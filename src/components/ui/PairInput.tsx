import type { HTMLInputTypeAttribute } from 'react';
import Input from './input';
import Button from './button';
import Plus from '@/assets/svg/plus.svg?react';
import Trash from '@/assets/svg/trash.svg?react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import Label from '@/components/ui/Label';

interface SingleInputProps {
  title: string;
  name: string;
  type: HTMLInputTypeAttribute;
  isDisabled?: (field: Record<string, string>) => boolean;
}

interface Props {
  title: string;
  name: string;
  pairKey: SingleInputProps;
  pairValue: SingleInputProps;
  isRemovable?: (field: Record<string, string>) => boolean;
}

export default function PairInput({
  title,
  name,
  pairKey,
  pairValue,
  isRemovable,
}: Props) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className="col-span-2 max-md:col-span-1">
      <div className="mb-16 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Button
          title={`Add ${title}`}
          className="max-sm:p-8"
          type="button"
          variant="iconBackground"
          onClick={() => append({ name: '', value: '' })}
        >
          <Plus height={18} width={18} strokeWidth={4} />
        </Button>
      </div>

      {fields.map((field, index) => {
        const fieldErrors =
          (
            errors[name] as
              | Record<number, Record<string, { message?: string }>>
              | undefined
          )?.[index] ?? {};
        const numberOptions = { valueAsNumber: true };

        return (
          <div
            key={field.id}
            className="mb-32 flex items-start gap-32 max-sm:gap-16"
          >
            <div className="grid w-full grid-cols-2 gap-32 max-md:grid-cols-1">
              <Label
                id={`${name}.${index}.${pairKey.name}`}
                label={`*${pairKey.title}`}
                error={fieldErrors?.[pairKey.name]?.message ?? ''}
              >
                <Input
                  id={`${name}.${index}.${pairKey.name}`}
                  type={pairKey.type}
                  placeholder={pairKey.title}
                  {...register(`${name}.${index}.${pairKey.name}`)}
                  disabled={pairKey.isDisabled?.(field)}
                />
              </Label>
              <Label
                id={`${name}.${index}.${pairValue.name}`}
                label={`*${pairValue.title}`}
                error={fieldErrors?.[pairValue.name]?.message ?? ''}
              >
                <Input
                  id={`${name}.${index}.${pairValue.name}`}
                  type={pairValue.type}
                  placeholder={pairValue.title}
                  {...register(
                    `${name}.${index}.${pairValue.name}`,
                    pairValue.type === 'number' ? numberOptions : undefined,
                  )}
                  disabled={pairValue.isDisabled?.(field)}
                />
              </Label>
            </div>

            {isRemovable?.(field) ? (
              <div className="h-24 w-24"></div>
            ) : (
              <Button
                title="Remove pair"
                type="button"
                variant="icon"
                onClick={() => remove(index)}
              >
                <Trash height={24} width={24} />
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}
