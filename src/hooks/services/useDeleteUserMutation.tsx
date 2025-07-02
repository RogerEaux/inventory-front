import { graphqlRequest } from '@/services/graphqlClient';
import { useAuthStore } from '@/stores/useAuthStore';
import { useMutation } from '@tanstack/react-query';

export function useDeleteUserMutation() {
  const token = useAuthStore((state) => state.token);

  const query = `
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
  `;

  async function mutationFn(id: string) {
    try {
      const variables = { id };

      await graphqlRequest(query, token, variables);
    } catch {
      throw new Error('Failed to delete user');
    }
  }

  return useMutation({
    mutationFn,
  });
}
