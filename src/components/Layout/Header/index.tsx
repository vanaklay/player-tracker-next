import { SiteConfig } from '@/src/lib/config';
import Link from 'next/link';
import { ThemeToggle } from '../../ThemeToggle';
import { Typography } from '../../Typography';
import Image from 'next/image';
import logo from '../../../../public/cs.small.jpg';

export function Header() {
  return (
    // eslint-disable-next-line tailwindcss/classnames-order
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Image src={logo} alt={SiteConfig.alt} className="h-7 w-7" />
          <Typography variant="h3" as={Link} href="/">
            {SiteConfig.title}
          </Typography>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
