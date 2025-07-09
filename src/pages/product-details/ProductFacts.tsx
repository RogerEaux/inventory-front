import Button from '@/components/ui/button';
import type { Attribute } from '@/schemas/form/productSchema';
import defaultProduct from '@/assets/svg/default-product.svg';

interface Props {
  imageUrl: string;
  name: string;
  category: string;
  attributes: Attribute[];
}

export default function ProductFacts({
  imageUrl,
  name,
  category,
  attributes,
}: Props) {
  return (
    <section className="mb-16 flex w-full max-w-4/5 gap-x-32 px-24 py-16 max-lg:flex-col max-sm:max-w-full">
      <img
        src={imageUrl || defaultProduct}
        alt={name}
        className="w-xl rounded-md max-lg:self-center max-md:w-lg max-sm:w-md"
      />
      <div className="flex w-full flex-col justify-between gap-12">
        <div className="flex flex-col items-end gap-8">
          <h2 className="text-2xl font-medium">{name}</h2>
          <h3 className="text-gray text-xl font-medium">{category}</h3>
        </div>
        <div className="w-full">
          <h3 className="py-8 text-lg font-semibold">Details</h3>
          <ul>
            {attributes.map((att) => (
              <li
                key={att.name}
                className="border-gray border-t py-8 text-base"
              >{`${att.name}: ${att.value}`}</li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end gap-16">
          <Button variant="cancel">Delete</Button>
          <Button>Edit</Button>
        </div>
      </div>
    </section>
  );
}
