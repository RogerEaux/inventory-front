import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../header/Header';
import Loading from '@/components/ui/Loading';
import { useAuthStore } from '@/stores/useAuthStore';

interface Props {
  allowedRoles?: string[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: PropsWithChildren<Props>) {
  const loading = useAuthStore((state) => state.loading);
  const user = useAuthStore((state) => state.user);
  const roles = useAuthStore((state) => state.roles);
  const isAllowed = allowedRoles
    ? allowedRoles.some((role) => roles?.includes(role))
    : true;

  if (loading)
    return (
      <div className="flex h-[100vh] flex-col">
        <Header />
        <div className="flex w-full flex-1 items-center justify-center">
          <Loading />
        </div>
      </div>
    );

  if (!user) return <Navigate to="/login" replace />;

  if (!isAllowed) return <Navigate to="/unauthorised" replace />;

  return <>{children}</>;
}
