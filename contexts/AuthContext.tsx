
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState, OTPData } from '../types';

const API_URL = "http://localhost:3000"; // عنوان السيرفر الخاص بك

interface AuthContextType extends AuthState {
  login: (email: string, pass: string) => Promise<{success: boolean; message: string}>;
  requestOTP: (email: string, type: 'register' | 'forgot', userData?: any) => Promise<{success: boolean; otpData?: OTPData; message?: string}>;
  verifyAndRegister: (otp: string, otpData: OTPData) => Promise<{success: boolean; message: string}>;
  resetPassword: (otp: string, otpData: OTPData, newPass: string) => Promise<{success: boolean; message: string}>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('damac_session');
    if (saved) setUser(JSON.parse(saved));
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    const users = JSON.parse(localStorage.getItem('damac_users') || '[]');
    const found = users.find((u: any) => u.email === email && u.pass === pass);
    if (found) {
      const sessionUser: User = { 
        id: found.id, firstName: found.firstName, fatherName: found.fatherName, 
        lastName: found.lastName, email: found.email, isVerified: true, joinedAt: found.joinedAt 
      };
      setUser(sessionUser);
      localStorage.setItem('damac_session', JSON.stringify(sessionUser));
      return { success: true, message: 'Welcome back' };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const requestOTP = async (email: string, type: 'register' | 'forgot', userData?: any) => {
    try {
      // إذا كان نسيان كلمة السر، نتأكد من وجود المستخدم أولاً
      if (type === 'forgot') {
        const users = JSON.parse(localStorage.getItem('damac_users') || '[]');
        if (!users.find((u: any) => u.email === email)) {
          return { success: false, message: 'Email not found' };
        }
      }

      const res = await fetch(`${API_URL}/send-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        const otpData: OTPData = { 
          code: data.code, 
          expiresAt: data.expiresAt, 
          email: email, 
          type: type, 
          userData 
        };
        return { success: true, otpData };
      }
      return { success: false, message: 'Failed to send mail' };
    } catch (error) {
      return { success: false, message: 'Server Unreachable' };
    }
  };

  const verifyAndRegister = async (otp: string, otpData: OTPData) => {
    if (Date.now() > new Date(otpData.expiresAt).getTime()) return { success: false, message: 'Expired' };
    if (otp !== otpData.code) return { success: false, message: 'Invalid' };

    const newUser = { 
      id: Math.random().toString(36).substr(2, 9), ...otpData.userData, 
      joinedAt: new Date().toISOString() 
    };
    const users = JSON.parse(localStorage.getItem('damac_users') || '[]');
    users.push(newUser);
    localStorage.setItem('damac_users', JSON.stringify(users));

    const sessionUser: User = { 
      id: newUser.id, firstName: newUser.firstName, fatherName: newUser.fatherName, 
      lastName: newUser.lastName, email: newUser.email, isVerified: true, joinedAt: newUser.joinedAt 
    };
    setUser(sessionUser);
    localStorage.setItem('damac_session', JSON.stringify(sessionUser));
    return { success: true, message: 'Success' };
  };

  const resetPassword = async (otp: string, otpData: OTPData, newPass: string) => {
    if (Date.now() > new Date(otpData.expiresAt).getTime()) return { success: false, message: 'Expired' };
    if (otp !== otpData.code) return { success: false, message: 'Invalid' };

    const users = JSON.parse(localStorage.getItem('damac_users') || '[]');
    const idx = users.findIndex((u: any) => u.email === otpData.email);
    if (idx !== -1) {
      users[idx].pass = newPass;
      localStorage.setItem('damac_users', JSON.stringify(users));
      
      const found = users[idx];
      const sessionUser: User = { 
        id: found.id, firstName: found.firstName, fatherName: found.fatherName, 
        lastName: found.lastName, email: found.email, isVerified: true, joinedAt: found.joinedAt 
      };
      setUser(sessionUser);
      localStorage.setItem('damac_session', JSON.stringify(sessionUser));
      return { success: true, message: 'Reset Successful' };
    }
    return { success: false, message: 'Error' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('damac_session');
  };

  return (
    <AuthContext.Provider value={{ 
      user, isLoading, login, requestOTP, verifyAndRegister, 
      resetPassword, logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
