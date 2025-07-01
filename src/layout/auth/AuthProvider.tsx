import { useEffect } from 'react';
import { getIdTokenResult } from 'firebase/auth';
import { useAuthStore } from '@/stores/useAuthStore';
import { listenToAuthChange } from '@/services/auth';

export default function AuthProvider() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const resetAuth = useAuthStore((state) => state.resetAuth);

  useEffect(() => {
    const unsub = listenToAuthChange(async (firebaseUser) => {
      setAuth({ loading: true });
      if (firebaseUser) {
        try {
          const tokenResult = await getIdTokenResult(firebaseUser, true);
          const { token, claims } = tokenResult;
          setAuth({
            user: firebaseUser,
            token,
            roles: (claims.roles || []) as string[],
            loading: false,
          });
        } catch {
          resetAuth();
        }
      } else {
        resetAuth();
      }
    });

    return () => unsub();
  }, [setAuth, resetAuth]);

  return null;
}
