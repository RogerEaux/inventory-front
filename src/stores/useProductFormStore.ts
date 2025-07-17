import { type ProductUpdateForm } from '@/schemas/form/productSchema';
import { create } from 'zustand';

export interface ProductFormState {
  product: (ProductUpdateForm & { id: string }) | null;
  setProduct: (product: (ProductUpdateForm & { id: string }) | null) => void;
}

export const useProductFormStore = create<ProductFormState>((set) => ({
  product: null,
  setProduct: (product) => set({ product }),
}));
