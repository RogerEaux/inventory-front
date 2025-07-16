import { graphqlRequest } from '@/services/graphqlClient';
import { useAuthStore } from '@/stores/useAuthStore';
import { useMutation } from '@tanstack/react-query';

export interface UpdateProductStockInput {
  productId: string;
  useType: string;
  quantity: number;
}

export function useUpdateProductStockMutation() {
  const token = useAuthStore((state) => state.token);

  const query = `
    mutation UpdateProductStock($input: UpdateProductStockInput!) {
    updateProductStock(input: $input) {
        id
    }
  }`;

  async function mutationFn({
    productId,
    useType,
    quantity,
  }: UpdateProductStockInput) {
    try {
      const variables = {
        input: {
          productId,
          useType,
          quantity,
        },
      };

      await graphqlRequest(query, token, variables);
    } catch {
      throw new Error('Failed to update product stock');
    }
  }

  return useMutation({
    mutationFn,
  });
}
