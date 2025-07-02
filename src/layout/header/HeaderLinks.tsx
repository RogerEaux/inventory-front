import { SheetClose } from '@/components/ui/sheet';
import { useHeaderLinks } from '@/hooks/utils/useHeaderLinks';
import HeaderLink from './HeaderLink';

interface Props {
  drawer?: boolean;
}

export default function HeaderLinks({ drawer }: Props) {
  const links = useHeaderLinks();

  return (
    <nav>
      <ul
        className={`flex gap-36 ${drawer ? 'flex-col items-start px-36 py-24' : 'items-center'}`}
      >
        {links.map((link) => (
          <li key={link.name}>
            {drawer ? (
              <SheetClose asChild>
                <HeaderLink {...link} />
              </SheetClose>
            ) : (
              <HeaderLink {...link} />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
