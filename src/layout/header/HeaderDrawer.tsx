import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Button from '@/components/ui/button';
import HamburgerIcon from '@/assets/svg/hamburger.svg?react';
import HeaderProfile from './HeaderProfile';
import HeaderLinks from './HeaderLinks';
import { links } from './linksData';

export default function HeaderDrawer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="icon" className="p-3">
          <HamburgerIcon height={30} width={30} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-white" aria-describedby="">
        <SheetHeader className="shadow-background bg-highlights max-h-80 w-full items-start justify-center px-36 py-24">
          <SheetTitle className="hidden">Navigation</SheetTitle>
          <SheetClose asChild>
            <HeaderProfile />
          </SheetClose>
        </SheetHeader>
        <HeaderLinks links={links} drawer />
      </SheetContent>
    </Sheet>
  );
}
