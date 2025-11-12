import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { CartProvider } from './components/CartContext';
import { ProductProvider } from './components/ProductContext';
import { UserProvider } from './components/UserContext';
import { OrderProvider } from './components/OrderContext';
import { Toaster } from './components/ui/sonner';
import { SignUp } from './components/pages/SignUp';
import { Login } from './components/pages/Login';
import { Home } from './components/pages/Home';
import { Profile } from './components/pages/Profile';
import { PlantScan } from './components/pages/PlantScan';
import { DiagnosisResult } from './components/pages/DiagnosisResult';
import { Checkout } from './components/pages/Checkout';
import { GrowthTracker } from './components/pages/GrowthTracker';
import { Reminders } from './components/pages/Reminders';
import { CommunityForum } from './components/pages/CommunityForum';
import { Admin } from './components/pages/Admin';
import { OrderTracking } from './components/pages/OrderTracking';

export default function App() {
  return (
    <Router>
      <UserProvider>
        <OrderProvider>
          <ProductProvider>
            <CartProvider>
              <div className="min-h-screen bg-gray-50">
                <Routes>
                  <Route path="/" element={<Navigate to="/login" replace />} />
                  <Route path="/preview_page.html" element={<Navigate to="/login" replace />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/scan" element={<PlantScan />} />
                  <Route path="/diagnosis" element={<DiagnosisResult />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/orders" element={<OrderTracking />} />
                  <Route path="/growth" element={<GrowthTracker />} />
                  <Route path="/reminders" element={<Reminders />} />
                  <Route path="/community" element={<CommunityForum />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
                <Navigation />
                <Toaster position="top-center" richColors />
              </div>
            </CartProvider>
          </ProductProvider>
        </OrderProvider>
      </UserProvider>
    </Router>
  );
}
