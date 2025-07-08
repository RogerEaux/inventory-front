import { type Product } from '@/schemas/form/productSchema';
import { create } from 'zustand';

export interface ProductFormState {
  product: Product | null;
  setProduct: (product: Product | null) => void;
}

export const useProductFormStore = create<ProductFormState>((set) => ({
  product: null,
  setProduct: (product) => set({ product }),
}));
