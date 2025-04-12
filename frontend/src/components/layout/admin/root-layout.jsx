import { Outlet } from 'react-router-dom';

import { Appbar } from './appbar';

export const AdminRootLayout = () => (
  <div>
    <Appbar />
    <Outlet />
  </div>
);
