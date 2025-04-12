import { Outlet } from 'react-router-dom';

import { Appbar } from './appbar';
import { Footer } from './footer';

export const ShopRootLayout = () => (
  <>
    <Appbar />
    <Outlet />
    <Footer />
  </>
);
