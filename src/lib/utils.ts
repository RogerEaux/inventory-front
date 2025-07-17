import type { StockByUse } from '@/schemas/form/productSchema';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export const getBase64Data = (base64: string) => base64.split(',')[1];

export const getBase64ContentType = (base64: string) =>
  base64.match(/^data:(.*?);base64,/)?.[1];

export const getTotalStockQuantity = (stockByUse: StockByUse[]) =>
  stockByUse.reduce((acc, curr) => acc + curr.quantity, 0);
