import { useAuthStore } from '@/stores/useAuthStore';

export function useHeaderLinks() {
  const roles = useAuthStore((s) => s.roles);
  const isAdmin = roles?.includes('ADMIN');

  return [
    ...(isAdmin ? [{ name: 'Users', path: '/users' }] : []),
    { name: 'Products', path: '/products' },
    { name: 'History', path: '/history' },
  ];
}
