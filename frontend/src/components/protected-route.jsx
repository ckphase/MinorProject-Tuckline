import { Outlet } from 'react-router-dom';

export const ProtectedRoute = ({ allowedRoles }) => {
  console.log('ProtectedRoute', allowedRoles);

  return <Outlet />;
};
