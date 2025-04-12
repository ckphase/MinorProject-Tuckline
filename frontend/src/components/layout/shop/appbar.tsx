import { buttonVariants } from '@/components/ui/button';
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
        <div className='space-x-2'>
          <Link
            to='/login'
            className={buttonVariants()}
          >
            Login
          </Link>
          <Link
            to='/register'
            className={buttonVariants({ variant: 'secondary' })}
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};
