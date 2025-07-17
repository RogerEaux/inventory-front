import { graphqlRequest } from '@/services/graphqlClient';
import { useAuthStore } from '@/stores/useAuthStore';
import { useMutation } from '@tanstack/react-query';

export function useDeleteProductMutation() {
  const token = useAuthStore((state) => state.token);

  const query = `
  mutation DeleteProduct($id: ID!) {
    deleteProduct(productId: $id)
  }
  `;

  async function mutationFn(id: string) {
    try {
      const variables = { id };

      await graphqlRequest(query, token, variables);
    } catch {
      throw new Error('Failed to delete product');
    }
  }

  return useMutation({
    mutationFn,
  });
}
