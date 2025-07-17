import { getBase64ContentType, getBase64Data } from '@/lib/utils';
import type { ProductCreateForm } from '@/schemas/form/productSchema';
import { graphqlRequest } from '@/services/graphqlClient';
import { useAuthStore } from '@/stores/useAuthStore';
import { useMutation } from '@tanstack/react-query';

export function useCreateProductMutation() {
  const token = useAuthStore((state) => state.token);

  const query = `
  mutation CreateProduct($input: NewProductInput!) {
    createProduct(input: $input) {
        id
    }
  }
  `;

  async function mutationFn({
    name,
    category,
    minimumStock,
    attributes,
    stock,
    fileBase64,
  }: ProductCreateForm) {
    try {
      const data = getBase64Data(fileBase64);
      const contentType = getBase64ContentType(fileBase64);

      const variables = {
        input: {
          name,
          category,
          minimumStock,
          attributes,
          stockByUse: [{ useType: 'GENERAL', quantity: stock }],
          fileBase64: data,
          fileContentType: contentType,
        },
      };

      await graphqlRequest(query, token, variables);
    } catch {
      throw new Error('Failed to create product');
    }
  }

  return useMutation({
    mutationFn,
  });
}
