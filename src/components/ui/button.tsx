import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded font-bold transition-all focus-visible:ring-2 cursor-pointer text-base py-12 px-16 outline-hidden disabled:bg-gray disabled:text-white disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default:
          'bg-highlights hover:bg-dark-highlights focus-visible:bg-dark-highlights text-black',
        cancel:
          'bg-error hover:bg-dark-error focus-visible:bg-dark-error text-white ring-black',
        iconBackground:
          'bg-highlights hover:bg-dark-highlights focus-visible:bg-dark-highlights px-12',
        icon: 'bg-transparent p-0',
        select:
          'bg-white justify-start px-12 border-black border transition-all font-normal cursor-default',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export default function Button({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  );
}
