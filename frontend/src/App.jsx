import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/protected-route';

import { AdminRootLayout } from './components/layout/admin/root-layout';
import { AdminDashboard } from './components/pages/admin/dashboard';

import { ShopRootLayout } from './components/layout/shop/root-layout';
import { ShopHome } from './components/pages/shop/home';

function App() {
  return (
    <Routes>
      <Route
        path='/register'
        element={<div>Register page</div>}
      />
      <Route
        path='/login'
        element={<div>Login page</div>}
      />

      {/* Admin Portal */}
      <Route
        path='/admin'
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminRootLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={<AdminDashboard />}
        />
        <Route
          path='orders'
          element={<div>Admin Orders</div>}
        />
        <Route
          path='products'
          element={<div>Product Management</div>}
        />
      </Route>

      {/* Customer Portal */}
      <Route
        path='/'
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <ShopRootLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={<ShopHome />}
        />
        <Route
          path='orders'
          element={<div>Customer Orders</div>}
        />
        <Route
          path='profile'
          element={<div>Customer Profile</div>}
        />
      </Route>

      {/* Fallback */}
      <Route
        path='*'
        element={<div>404 Not Found</div>}
      />
    </Routes>
  );
}

export default App;
