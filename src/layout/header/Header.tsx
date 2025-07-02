import { Link } from 'react-router-dom';
import GridIcon from '@/assets/svg/grid-icon.svg?react';
import HeaderLinks from './HeaderLinks';
import HeaderDrawer from './HeaderDrawer';
import HeaderProfile from './HeaderProfile';

export default function Header() {
  return (
    <header className="bg-highlights flex max-h-80 flex-none items-center justify-between px-48 py-24 max-sm:px-24">
      <Link
        to="/"
        className="flex items-center gap-16 outline-none focus-visible:ring-2"
      >
        <GridIcon height={36} width={36} />
        <p className="text-xl font-bold text-black">Grid Dynamics</p>
      </Link>
      <div className="flex items-center gap-36 max-md:hidden">
        <HeaderLinks />
        <HeaderProfile />
      </div>
      <div className="md:hidden">
        <HeaderDrawer />
      </div>
    </header>
  );
}
