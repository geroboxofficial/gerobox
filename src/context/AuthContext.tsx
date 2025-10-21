import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '@/utils/toast';

interface User {
  email: string;
  role: 'superadmin' | 'admin' | 'seller' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isLoading: boolean; // Add isLoading state
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Initialize as true
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('gerobox_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false); // Set to false after checking localStorage
  }, []);

  const login = (email: string, password: string) => {
    // Demo accounts (hardcoded for preview mode)
    const demoAccounts: Record<string, User> = {
      'superadmin@gerobox.my': { email: 'superadmin@gerobox.my', role: 'superadmin' },
      'admin@gerobox.my': { email: 'admin@gerobox.my', role: 'admin' },
      'seller@gerobox.my': { email: 'seller@gerobox.my', role: 'seller' },
      'user@gerobox.my': { email: 'user@gerobox.my', role: 'user' },
    };

    if (password === 'password' && demoAccounts[email]) {
      const loggedInUser = demoAccounts[email];
      setUser(loggedInUser);
      localStorage.setItem('gerobox_user', JSON.stringify(loggedInUser));
      showSuccess(`Selamat datang, ${loggedInUser.email}!`);

      // Redirect based on role
      switch (loggedInUser.role) {
        case 'superadmin':
          navigate('/super-admin-dashboard');
          break;
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'seller':
          navigate('/seller-dashboard');
          break;
        case 'user':
        default:
          navigate('/');
          break;
      }
    } else {
      showError('Emel atau kata laluan salah.');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gerobox_user');
    showSuccess('Anda telah log keluar.');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};