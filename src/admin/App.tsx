import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProductProvider } from '../components/ProductContext';
import { OrderProvider } from '../components/OrderContext';
import { UserProvider } from '../components/UserContext';
import { Admin as AdminPage } from '../components/pages/Admin';
import { useUser } from '../components/UserContext';
import AdminLogin from './AdminLogin';
import { Toaster } from '../components/ui/sonner';

function RequireAdmin({ children }: { children: JSX.Element }) {
  const { currentUser } = useUser();
  const isAdmin = currentUser?.email === 'admin@docplant.com';
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <UserProvider>
      <OrderProvider>
        <ProductProvider>
          <Toaster richColors position="top-center" />
          <HashRouter>
            <Routes>
              <Route path="/login" element={<AdminLogin />} />
              <Route
                path="/"
                element={
                  <RequireAdmin>
                    <AdminPage />
                  </RequireAdmin>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </HashRouter>
        </ProductProvider>
      </OrderProvider>
    </UserProvider>
  );
}
