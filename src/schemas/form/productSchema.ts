import { z } from 'zod';

export const attributeSchema = z
  .object({
    name: z.string().optional(),
    value: z.string().optional(),
  })
  .refine(({ name, value }) => (!name && !value) || (name && value), {
    message: 'Both name and value are required if either is filled',
    path: ['name'],
  });

export const stockByUseSchema = z.object({
  useType: z.string().min(1, 'Use type is required'),
  quantity: z
    .number({ invalid_type_error: 'Quantity must be a number' })
    .int('Quantity must be a whole number')
    .nonnegative('Quantity must be 0 or more'),
});

export const productSchema = z
  .object({
    name: z.string().min(1, 'Product name is required'),
    category: z.string().min(1, 'Category is required'),
    minimumStock: z
      .number({ invalid_type_error: 'Minimum stock must be a number' })
      .int('Minimum stock must be a whole number')
      .nonnegative('Minimum stock must be 0 or more'),
    imageUrl: z.string().url('Image URL must be a valid URL'),
    attributes: z.array(attributeSchema),
    stockByUse: z
      .array(stockByUseSchema)
      .min(1, 'At least one stock entry is required'),
  })
  .passthrough();

export type Product = z.infer<typeof productSchema>;
export type ProductPreview = { id: string; stockQuantity: number } & Pick<
  Product,
  'name' | 'imageUrl' | 'category' | 'minimumStock'
>;
export type Attribute = z.infer<typeof attributeSchema>;
export type StockByUse = z.infer<typeof stockByUseSchema>;
