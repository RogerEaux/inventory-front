import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';

export function useAuthRedirect(to = '/users') {
  const user = useAuthStore((state) => state.user);
  const roles = useAuthStore((state) => state.roles);
  const loading = useAuthStore((state) => state.loading);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && roles?.length) {
      navigate(to, { replace: true });
    }
  }, [user, roles, loading, navigate, to]);
}
