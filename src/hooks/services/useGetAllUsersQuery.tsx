import type {
  departmentTypes,
  roleTypes,
} from '@/pages/users/users-form/roleOptions';
import { graphqlRequest } from '@/services/graphqlClient';
import { useAuthStore } from '@/stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';

interface UsersResponse {
  getAllUsers: [
    {
      id: string;
      name: string;
      email: string;
      roles: {
        department: departmentTypes;
        role: roleTypes;
      }[];
    },
  ];
}

export function useGetAllUsersQuery() {
  const token = useAuthStore((state) => state.token);

  const query = `
  query GetAllUsers {
    getAllUsers {
        id
        name
        email
        roles {
        department
        role
        }
    }
  }`;

  async function queryFn() {
    try {
      return await graphqlRequest(query, token);
    } catch {
      throw new Error('Failed to fetch users');
    }
  }

  return useQuery<UsersResponse>({
    queryKey: ['users'],
    queryFn,
    enabled: !!token,
  });
}
