import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEFAULT_USER = {
  name: 'Myntra Brand Operations',
  email: 'brand.partner@myntra.com',
  brand: 'Myntra',
  role: 'Program Director',
  avatar: 'MB',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('hp_brand_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_USER;
      }
    }
    return DEFAULT_USER;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('hp_auth_status') !== 'logged_out';
  });

  const login = (email, password) => {
    const loggedUser = {
      ...DEFAULT_USER,
      email: email || DEFAULT_USER.email,
    };
    setUser(loggedUser);
    setIsAuthenticated(true);
    localStorage.setItem('hp_brand_user', JSON.stringify(loggedUser));
    localStorage.setItem('hp_auth_status', 'logged_in');
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.setItem('hp_auth_status', 'logged_out');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
