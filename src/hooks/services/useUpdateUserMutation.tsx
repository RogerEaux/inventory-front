import type { User } from '@/schemas/form/userSchema';
import { graphqlRequest } from '@/services/graphqlClient';
import { useAuthStore } from '@/stores/useAuthStore';
import { useMutation } from '@tanstack/react-query';

export function useUpdateUserMutation() {
  const token = useAuthStore((state) => state.token);

  const query = `
  mutation UpdateUser($in: UpdateUserInput!) {
    updateUser(input: $in) 
  }
  `;

  async function mutationFn({ id, name, email, roles, department }: User) {
    try {
      const variables = {
        in: {
          id,
          name,
          email,
          roles: roles.map((role) => ({
            department,
            role,
          })),
        },
      };

      await graphqlRequest(query, token, variables);
    } catch {
      throw new Error('Failed to update user');
    }
  }

  return useMutation({
    mutationFn,
  });
}
