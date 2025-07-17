import type { Product } from '@/schemas/form/productSchema';
import { graphqlRequest } from '@/services/graphqlClient';
import { useAuthStore } from '@/stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';

interface ProductsResponse {
  visibleProductsByUser: Product[];
}

export function useVisibleProductsByUser() {
  const token = useAuthStore((state) => state.token);

  const query = `
  query VisibleProductsByUser {
    visibleProductsByUser {
        id
        name
        category
        minimumStock
        imageUrl
        attributes {
            name
            value
        }
        stockByUse {
            useType
            quantity
        }
    }
  }
  `;

  async function queryFn() {
    try {
      return await graphqlRequest(query, token);
    } catch {
      throw new Error('Failed to fetch products');
    }
  }

  return useQuery<ProductsResponse>({
    queryKey: ['products'],
    queryFn,
    enabled: !!token,
  });
}
