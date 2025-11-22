import { Home, Scan, TrendingUp, Bell, Users, User, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Navigation() {
  const location = useLocation();
  
  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/scan', icon: Scan, label: 'Scan' },
    { path: '/growth', icon: TrendingUp, label: 'Tracker' },
    { path: '/reminders', icon: Bell, label: 'Reminders' },
    { path: '/community', icon: Users, label: 'Community' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  // Don't show navigation on login/signup pages
  if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 backdrop-blur-xl bg-white/60 border-t-2 border-white/40 z-50 shadow-lg shadow-emerald-100/20">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'text-emerald-600 bg-emerald-50/80 shadow-sm' 
                    : 'text-gray-500 hover:text-emerald-600 hover:bg-emerald-50/40'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}