import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchJson } from '../lib/api';

export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: string;
}

interface UserContextType {
  currentUser: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

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

const loadToken = (): string | null => {
  try {
    return localStorage.getItem('docplant_token');
  } catch {
    return null;
  }
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(loadCurrentUser);
  const [token, setToken] = useState<string | null>(loadToken);

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

  // Save token
  useEffect(() => {
    try {
      if (token) {
        localStorage.setItem('docplant_token', token);
      } else {
        localStorage.removeItem('docplant_token');
      }
    } catch (error) {
      console.error('Error saving token to localStorage:', error);
    }
  }, [token]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetchJson<{ token: string; user: User }>(`/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setCurrentUser(res.user);
      setToken(res.token);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const res = await fetchJson<{ token: string; user: User }>(`/auth/register`, {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
      });
      setCurrentUser(res.user);
      setToken(res.token);
      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ currentUser, token, login, signup, logout }}>
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
