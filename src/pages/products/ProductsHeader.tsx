import Button from '@/components/ui/button';
import Plus from '@/assets/svg/plus.svg?react';

export default function ProductsHeader() {
  return (
    <div className="flex items-center justify-between gap-32 p-16 max-sm:gap-16">
      <h1 className="text-3xl font-bold text-nowrap max-sm:text-2xl">
        Products
      </h1>
      <Button
        title="Add product"
        className="max-sm:p-8"
        variant="iconBackground"
      >
        <Plus height={24} width={24} strokeWidth={4} />
      </Button>
    </div>
  );
}
