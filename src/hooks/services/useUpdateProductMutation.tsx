import { getBase64ContentType, getBase64Data } from '@/lib/utils';
import type { ProductUpdateForm } from '@/schemas/form/productSchema';
import { graphqlRequest } from '@/services/graphqlClient';
import { useAuthStore } from '@/stores/useAuthStore';
import { useMutation } from '@tanstack/react-query';

export function useUpdateProductMutation() {
  const token = useAuthStore((state) => state.token);

  const query = `
    mutation UpdateProduct($input: UpdateProductInput!) {
      updateProduct(input: $input) {
          id
      }
    }
    `;

  async function mutationFn({
    id,
    name,
    category,
    minimumStock,
    attributes,
    fileBase64,
  }: ProductUpdateForm & { id: string }) {
    try {
      const variables = {
        input: {
          id,
          name,
          category,
          minimumStock,
          attributes,
          ...(fileBase64
            ? {
                fileBase64: getBase64Data(fileBase64),
                fileContentType: getBase64ContentType(fileBase64),
              }
            : {}),
        },
      };

      await graphqlRequest(query, token, variables);
    } catch {
      throw new Error('Failed to update product');
    }
  }

  return useMutation({
    mutationFn,
  });
}
