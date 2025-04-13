import { UserNav } from '@/components/user-nav';
import { Link } from 'react-router-dom';

// TODO: chandan
//       - add links to other required pages
export const Appbar = () => {
  return (
    <header className='sticky top-0 border-b border-border z-10 bg-white py-4'>
      <div className='container flex items-center justify-between'>
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
