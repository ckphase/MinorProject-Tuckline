import { UserNav } from '@/components/user-nav';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

// TODO: chandan
//       - add links to other required pages
export const Appbar = ({ children }: { children?: ReactNode }) => {
  return (
    <header className='sticky top-0 border-b border-border z-10 bg-white py-4'>
      <div className='container flex items-center justify-between'>
        {children}
        <Link
          to='/'
          className='text-2xl font-medium tracking-tight text-black'
        >
          Tuckline
        </Link>
        <UserNav />
      </div>
    </header>
  );
};
