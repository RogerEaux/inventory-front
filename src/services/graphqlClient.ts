import { logout } from './auth';

export async function graphqlRequest(
  query: string,
  token: string | null,
  variables?: object,
) {
  try {
    const res = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ query, variables }),
    });

    if (res.status === 401) {
      await logout();
      return null;
    }

    const json = await res.json();
    if (json.errors) {
      throw new Error(
        json.errors.map((err: { message: string }) => err.message).join(', '),
      );
    }

    return json.data;
  } catch (error) {
    throw new Error(`GraphQL request failed: ${(error as Error).message}`);
  }
}
