import { Link } from 'react-router-dom';

export const Footer = () => (
  <footer className='bg-gray-800 text-white mt-12'>
    <div className='container py-16 px-4 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {/* About Section */}
      <div className='max-w-lg'>
        <h2 className='text-2xl font-bold mb-4'>About Tuckline</h2>
        <p className='text-gray-400 leading-relaxed'>
          We're revolutionizing campus shopping by connecting all LPU tuck shops
          on a single platform. Compare prices, check availability, and find the
          best deals.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className='text-2xl font-bold mb-4'>Quick Links</h2>
        <ul className='list-none text-gray-400'>
          <li className='mb-2'>
            <Link
              to='/shop'
              className='hover:text-white transition-colors duration-300'
            >
              Browse Shops
            </Link>
          </li>
          <li className='mb-2'>
            <Link
              to='/cart'
              className='hover:text-white transition-colors duration-300'
            >
              View Cart
            </Link>
          </li>
          <li className='mb-2'>
            <Link
              to='/orders'
              className='hover:text-white transition-colors duration-300'
            >
              My Orders
            </Link>
          </li>
          <li className='mb-2'>
            <Link
              to='/contact'
              className='hover:text-white transition-colors duration-300'
            >
              Contact Support
            </Link>
          </li>
        </ul>
      </div>

      {/* Contact Info */}
      <div>
        <h2 className='text-2xl font-bold mb-4'>Contact Us</h2>
        <div className='text-gray-400 space-y-2'>
          <p>
            Email:{' '}
            <a
              href='mailto:support@tuckline.com'
              className='hover:text-white transition-colors duration-300'
            >
              support@tuckline.com
            </a>
          </p>
          <p>
            Phone:{' '}
            <a
              href='tel:+916024587854'
              className='hover:text-white transition-colors duration-300'
            >
              +91 916024587854
            </a>
          </p>
          <p>Address: LPU, Phagwara, Punjab, India</p>
        </div>
      </div>
    </div>

    <div className='text-sm py-8 text-center text-gray-400 border-t border-gray-700'>
      &copy; {new Date().getFullYear()} Tuckline. All rights reserved.
    </div>
  </footer>
);
