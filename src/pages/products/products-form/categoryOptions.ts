import type { departmentTypes } from '@/pages/users/users-form/roleOptions';

export type categoryTypes = Record<departmentTypes, string[]>;

export const categoryOptions: categoryTypes = {
  SWAG: ['ROPA_Y_TEXTILES', 'PAPELERIA', 'ACCESORIOS', 'ETC'],
  IT: ['ELECTRONICOS', 'IT'],
  OPERATIONS: ['COCINA'],
};
