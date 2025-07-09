import type { Product } from '@/schemas/form/productSchema';

export const productsData: Product[] = [
  {
    id: '1',
    name: 'Cleaning Spray',
    imageUrl: '',
    category: 'ACCESORIOS',
    minimumStock: 3,
    stockByUse: [
      { useType: 'GENERAL', quantity: 12 },
      { useType: 'WELCOME_KIT', quantity: 4 },
    ],
    attributes: [
      { name: 'Size', value: 'Big' },
      { name: 'Capacity', value: '800ml' },
    ],
  },
  {
    id: '2',
    name: 'Organic Cotton T-Shirt',
    imageUrl: '',
    category: 'ROPA_Y_TEXTILES',
    minimumStock: 2,
    stockByUse: [{ useType: 'EVENT', quantity: 4 }],
    attributes: [
      { name: 'Size', value: 'Medium' },
      { name: 'Color', value: 'White' },
      { name: 'Material', value: 'Organic Cotton' },
    ],
  },
  {
    id: '3',
    name: 'Reusable Water Bottle',
    imageUrl: '',
    category: 'ACCESORIOS',
    minimumStock: 4,
    stockByUse: [
      { useType: 'GENERAL', quantity: 0 },
      { useType: 'WELCOME_KIT', quantity: 3 },
    ],
    attributes: [
      { name: 'Capacity', value: '750ml' },
      { name: 'Material', value: 'Stainless Steel' },
      { name: 'Color', value: 'Blue' },
    ],
  },
  {
    id: '4',
    name: 'Bamboo Toothbrushes',
    imageUrl: '',
    category: 'ACCESORIOS',
    minimumStock: 1,
    stockByUse: [{ useType: 'GENERAL', quantity: 6 }],
    attributes: [{ name: 'Material', value: 'Bamboo' }],
  },
  {
    id: '5',
    name: 'Natural Deodorant',
    imageUrl: '',
    category: 'ACCESORIOS',
    minimumStock: 3,
    stockByUse: [{ useType: 'GENERAL', quantity: 5 }],
    attributes: [
      { name: 'Scent', value: 'Lavender' },
      { name: 'Type', value: 'Stick' },
    ],
  },
  {
    id: '6',
    name: 'Paper Notebook',
    imageUrl: '',
    category: 'PAPELERIA',
    minimumStock: 3,
    stockByUse: [
      { useType: 'GENERAL', quantity: 6 },
      { useType: 'WELCOME_KIT', quantity: 3 },
    ],
    attributes: [
      { name: 'Pages', value: '100' },
      { name: 'Cover Type', value: 'Softcover' },
    ],
  },
];
