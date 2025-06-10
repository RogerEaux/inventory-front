import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded font-bold transition-all focus-visible:ring-2 cursor-pointer text-base p-12 outline-none',
  {
    variants: {
      variant: {
        default: 'bg-highlights shadow-xs hover:bg-dark-highlights text-black',
        icon: 'bg-transparent p-0',
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
