import { UserNav } from '@/components/user-nav';
import { Link } from 'react-router-dom';

// TODO: chandan
//       - add links to other required pages
export const Appbar = () => {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-white py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo / Brand */}
        <Link to="/" className="text-2xl font-semibold tracking-tight text-black">
          Tuckline
        </Link>

        {/* Navigation Links - Add more here */}
        <nav className="flex items-center gap-6">
          {/* Example placeholder links */}
          {/* <Link to="/dashboard" className="text-sm text-gray-700 hover:text-black">Dashboard</Link> */}
          {/* <Link to="/about" className="text-sm text-gray-700 hover:text-black">About</Link> */}

          {/* User Navigation */}
          <UserNav />
        </nav>
      </div>
    </header>
  );
};