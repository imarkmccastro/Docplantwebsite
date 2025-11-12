import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { CartProvider } from './components/CartContext';
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

export default function App() {
  return (
    <Router>
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
            <Route path="/growth" element={<GrowthTracker />} />
            <Route path="/reminders" element={<Reminders />} />
            <Route path="/community" element={<CommunityForum />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
          <Navigation />
          <Toaster position="top-center" richColors />
        </div>
      </CartProvider>
    </Router>
  );
}
