
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, pass: string) => Promise<boolean>;
  register: (name: string, email: string, pass: string) => Promise<string>; // returns OTP
  verifyOTP: (email: string, otp: string, originalOTP: string, userData: any) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Persistence: Check for user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('damac_user_session');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    // Mock API Call
    const users = JSON.parse(localStorage.getItem('damac_registered_users') || '[]');
    const found = users.find((u: any) => u.email === email && u.pass === pass);
    
    if (found) {
      const sessionUser = { id: found.id, name: found.name, email: found.email, isVerified: true, joinedAt: found.joinedAt };
      setUser(sessionUser);
      localStorage.setItem('damac_user_session', JSON.stringify(sessionUser));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, pass: string) => {
    // Simulate sending email by generating a 6-digit code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`[SYSTEM] OTP for ${email}: ${otp}`);
    return otp;
  };

  const verifyOTP = async (email: string, otp: string, originalOTP: string, userData: any) => {
    if (otp === originalOTP) {
      const newUser = { 
        id: Math.random().toString(36).substr(2, 9), 
        ...userData, 
        joinedAt: new Date().toISOString() 
      };
      
      // Save to mock DB
      const users = JSON.parse(localStorage.getItem('damac_registered_users') || '[]');
      users.push({ ...newUser, pass: userData.pass });
      localStorage.setItem('damac_registered_users', JSON.stringify(users));
      
      // Auto login
      const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email, isVerified: true, joinedAt: newUser.joinedAt };
      setUser(sessionUser);
      localStorage.setItem('damac_user_session', JSON.stringify(sessionUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('damac_user_session');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, verifyOTP, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
