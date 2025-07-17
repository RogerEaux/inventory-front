import { z } from 'zod';

export const attributeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  value: z.string().min(1, 'Value is required'),
});

export const stockByUseSchema = z.object({
  useType: z.string().min(1),
  quantity: z.number().int().nonnegative(),
});

export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  category: z.string().min(1, 'Category is required'),
  minimumStock: z
    .number({ invalid_type_error: 'Minimum stock must be a number' })
    .int('Minimum stock must be a whole number')
    .nonnegative('Minimum stock must be 0 or more'),
  fileBase64: z.string().min(1, 'Image is required'),
  attributes: z.array(attributeSchema),
  stock: z
    .number({ invalid_type_error: 'Stock must be a number' })
    .int('Stock must be a whole number')
    .gte(1, 'Stock must be 1 or more'),
});

export const productUpdateSchema = productSchema.omit({ stock: true }).extend({
  fileBase64: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 1, {
      message: 'Image is required',
    }),
});

export type ProductCreateForm = z.infer<typeof productSchema>;
export type ProductUpdateForm = z.infer<typeof productUpdateSchema>;
export type Product = Omit<ProductCreateForm, 'fileBase64' | 'stock'> & {
  id: string;
  imageUrl: string;
  stockByUse: StockByUse[];
};
export type ProductPreview = { stockQuantity: number } & Pick<
  Product,
  'id' | 'name' | 'imageUrl' | 'category' | 'minimumStock'
>;
export type Attribute = z.infer<typeof attributeSchema>;
export type StockByUse = z.infer<typeof stockByUseSchema>;
