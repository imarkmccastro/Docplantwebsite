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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive ? 'text-green-600' : 'text-gray-500 hover:text-green-600'
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
