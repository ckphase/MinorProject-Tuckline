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
import { AdminCustomersPage } from './components/pages/admin/customers';
import { AdminProductsPage } from './components/pages/admin/products';
import { ProfilePage } from './components/pages/common/profile';

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
      <Route
        path='profile'
        element={<ProfilePage />}
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
            element={<AdminProductsPage />}
          />
          <Route
            path='customers'
            element={<AdminCustomersPage />}
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
