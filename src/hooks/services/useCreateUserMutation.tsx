import type { User } from '@/schemas/form/userSchema';
import { graphqlRequest } from '@/services/graphqlClient';
import { useAuthStore } from '@/stores/useAuthStore';
import { useMutation } from '@tanstack/react-query';

export function useCreateUserMutation() {
  const token = useAuthStore((state) => state.token);

  const query = `
  mutation CreateUser($in: NewUserInput!) {
    createUser(input: $in) {
        id
        name
        email
        roles {
        department
        role
        }
    }
  }
  `;

  async function mutationFn({ name, email, department, roles }: User) {
    try {
      const variables = {
        in: {
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
      throw new Error('Failed to create user');
    }
  }

  return useMutation({
    mutationFn,
  });
}
