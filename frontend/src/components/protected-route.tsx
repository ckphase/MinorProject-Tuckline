import { Outlet } from 'react-router-dom';

export const ProtectedRoute = ({
  allowedRoles,
}: {
  allowedRoles: string[];
}) => {
  console.log('ProtectedRoute', allowedRoles);

  return <Outlet />;
};
