import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import { Toaster } from '@/components/ui/sonner';

export default function Root() {
  return (
    <>
      <Toaster />
      <Header />
      <Outlet />
    </>
  );
}
