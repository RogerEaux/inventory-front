import type { PropsWithChildren } from 'react';

interface Props {
  id: string;
  label: string;
  error: string;
}

export default function LabeledInput({
  id,
  label,
  error,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="relative flex w-full flex-col gap-8">
      <label htmlFor={id} className="block text-base font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-error absolute -bottom-1/3 text-sm font-medium">
          {error}
        </p>
      )}
    </div>
  );
}
