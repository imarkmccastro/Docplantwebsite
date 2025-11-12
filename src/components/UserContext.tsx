import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  createdAt: string;
}

interface UserContextType {
  users: User[];
  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string, name: string) => boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Default admin user with fixed timestamp
const DEFAULT_ADMIN_USER: User = {
  id: 1,
  email: 'admin@docplant.com',
  password: 'admin123',
  name: 'Admin User',
  createdAt: '2024-01-01T00:00:00.000Z',
};

// Load users from localStorage or return default admin user
const loadUsers = (): User[] => {
  try {
    const storedUsers = localStorage.getItem('docplant_users');
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      console.log('Loaded users from localStorage:', users);
      return users;
    }
  } catch (error) {
    console.error('Error loading users from localStorage:', error);
  }
  
  console.log('No users in localStorage, returning default admin');
  // Return default admin user
  return [DEFAULT_ADMIN_USER];
};

// Load current user session from localStorage
const loadCurrentUser = (): User | null => {
  try {
    const storedUser = localStorage.getItem('docplant_current_user');
    if (storedUser) {
      return JSON.parse(storedUser);
    }
  } catch (error) {
    console.error('Error loading current user from localStorage:', error);
  }
  return null;
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(loadUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(loadCurrentUser);

  // Save users to localStorage whenever they change
  useEffect(() => {
    try {
      console.log('Saving users to localStorage:', users);
      localStorage.setItem('docplant_users', JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users to localStorage:', error);
    }
  }, [users]);

  // Save current user to localStorage whenever it changes
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('docplant_current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('docplant_current_user');
      }
    } catch (error) {
      console.error('Error saving current user to localStorage:', error);
    }
  }, [currentUser]);

  const login = (email: string, password: string): boolean => {
    console.log('Login attempt:', email);
    console.log('Available users:', users);
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      console.log('Login successful for:', email);
      setCurrentUser(user);
      return true;
    }
    console.log('Login failed - no matching user found');
    return false;
  };

  const signup = (email: string, password: string, name: string): boolean => {
    console.log('Signup attempt:', email);
    console.log('Current users:', users);
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      console.log('Signup failed - user already exists');
      return false;
    }

    const newUser: User = {
      id: Math.max(...users.map(u => u.id), 0) + 1,
      email,
      password,
      name,
      createdAt: new Date().toISOString(),
    };

    console.log('Creating new user:', newUser);
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ users, currentUser, login, signup, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
