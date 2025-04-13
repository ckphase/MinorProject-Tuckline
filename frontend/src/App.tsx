import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '@/components/pages/common/login';
import { RegisterPage } from '@/components/pages/common/register';
import { ProtectedRoute } from '@/components/protected-route';

import { AdminRootLayout } from '@/components/layout/admin/root-layout';
import { AdminDashboard } from '@/components/pages/admin/dashboard';

import { ShopRootLayout } from '@/components/layout/shop/root-layout';
import { ShopHome } from '@/components/pages/shop/home';
import { ShopCheckoutPage } from './components/pages/shop/checkout';
import { ShopOrderHistoryPage } from './components/pages/shop/orders';
import { AdminOrdersPage } from './components/pages/admin/orders';

function App() {
  return (
    <Routes>
      <Route
        path='/register'
        element={<RegisterPage />}
      />
      <Route
        path='/login'
        element={<LoginPage />}
      />

      {/* Admin Portal */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route
          path='/admin'
          element={<AdminRootLayout />}
        >
          <Route
            index
            element={<AdminDashboard />}
          />
          <Route
            path='orders'
            element={<AdminOrdersPage />}
          />
          <Route
            path='products'
            element={<div>Product Management</div>}
          />
        </Route>
      </Route>

      {/* Customer Portal */}
      <Route element={<ProtectedRoute allowedRoles={['customer']} />}>
        <Route
          path='/'
          element={<ShopRootLayout />}
        >
          <Route
            index
            element={<ShopHome />}
          />
          <Route
            path='checkout'
            element={<ShopCheckoutPage />}
          />
          <Route
            path='orders'
            element={<ShopOrderHistoryPage />}
          />
          <Route
            path='profile'
            element={<div>Customer Profile</div>}
          />
        </Route>
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
