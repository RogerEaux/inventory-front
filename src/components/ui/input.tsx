import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { forwardRef, type InputHTMLAttributes } from 'react';

const inputVariants = cva(
  'placeholder:text-gray bg-white rounded-md p-12 text-lg outline-none focus-visible:ring-2 transition-all disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'w-full border border-black text-base',
        login: 'w-md shadow-input rounded-none',
        search: 'w-full bg-light-gray rounded-l-none focus-visible:ring-0',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & VariantProps<typeof inputVariants>
>(({ className, type, variant, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      data-slot="input"
      className={cn(inputVariants({ variant, className }))}
      {...props}
    />
  );
});

export default Input;
