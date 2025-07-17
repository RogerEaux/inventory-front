import { graphqlRequest } from '@/services/graphqlClient';
import { useAuthStore } from '@/stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';

interface MovementLogsResponse {
  movementLogs: {
    quantity: number;
    action: 'INGRESO' | 'RETIRO' | 'CREACION';
    date: string;
    origin: string;
    user: {
      name: string;
    };
    product: {
      name: string;
    };
  }[];
}

export function useMovementLogs() {
  const token = useAuthStore((state) => state.token);

  const query = `
  query MovementLogs {
    movementLogs {
        quantity
        action
        date
        origin
        user {
            name
        }
        product {
            name
        }
    }
  }
  `;

  async function queryFn() {
    try {
      return await graphqlRequest(query, token);
    } catch {
      throw new Error('Failed to fetch movement logs');
    }
  }

  return useQuery<MovementLogsResponse>({
    queryKey: ['movements'],
    queryFn,
    enabled: !!token,
  });
}
