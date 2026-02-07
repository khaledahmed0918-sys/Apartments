
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState, OTPData } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, pass: string) => Promise<{success: boolean, message?: string}>;
  registerRequest: (userData: any) => Promise<string>; 
  verifyAndRegister: (otp: string, originalOTP: string, userData: any) => Promise<boolean>;
  forgotPasswordRequest: (email: string) => Promise<string | null>;
  resetPassword: (email: string, otp: string, originalOTP: string, newPass: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('damac_user_session');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    const users = JSON.parse(localStorage.getItem('damac_registered_users') || '[]');
    const found = users.find((u: any) => u.email === email && u.pass === pass);
    
    if (found) {
      const sessionUser = { 
        id: found.id, 
        firstName: found.firstName, 
        fatherName: found.fatherName,
        lastName: found.lastName,
        email: found.email, 
        isVerified: true, 
        joinedAt: found.joinedAt 
      };
      setUser(sessionUser);
      localStorage.setItem('damac_user_session', JSON.stringify(sessionUser));
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

  const registerRequest = async (userData: any) => {
    const otp = generateOTP();
    const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes
    console.log(`%c[MAIL SERVER] To: ${userData.email} | Subject: Verification Code | Code: ${otp} | Expires in: 5m`, "color: #c5a059; font-weight: bold;");
    return otp;
  };

  const verifyAndRegister = async (otp: string, originalOTP: string, userData: any) => {
    // In a real app, we'd check expiry here. Let's assume the UI handles the 5m timer.
    if (otp === originalOTP) {
      const newUser = { 
        id: Math.random().toString(36).substr(2, 9), 
        firstName: userData.firstName,
        fatherName: userData.fatherName,
        lastName: userData.lastName,
        email: userData.email,
        joinedAt: new Date().toISOString() 
      };
      
      const users = JSON.parse(localStorage.getItem('damac_registered_users') || '[]');
      users.push({ ...newUser, pass: userData.pass });
      localStorage.setItem('damac_registered_users', JSON.stringify(users));
      
      const sessionUser = { ...newUser, isVerified: true };
      setUser(sessionUser);
      localStorage.setItem('damac_user_session', JSON.stringify(sessionUser));
      return true;
    }
    return false;
  };

  const forgotPasswordRequest = async (email: string) => {
    const users = JSON.parse(localStorage.getItem('damac_registered_users') || '[]');
    const found = users.find((u: any) => u.email === email);
    if (!found) return null;

    const otp = generateOTP();
    console.log(`%c[MAIL SERVER] To: ${email} | Subject: Password Reset | Code: ${otp}`, "color: #ff4444; font-weight: bold;");
    return otp;
  };

  const resetPassword = async (email: string, otp: string, originalOTP: string, newPass: string) => {
    if (otp !== originalOTP) return false;

    let users = JSON.parse(localStorage.getItem('damac_registered_users') || '[]');
    const userIndex = users.findIndex((u: any) => u.email === email);
    
    if (userIndex !== -1) {
      users[userIndex].pass = newPass;
      localStorage.setItem('damac_registered_users', JSON.stringify(users));
      
      // Auto-login after reset
      const found = users[userIndex];
      const sessionUser = { 
        id: found.id, 
        firstName: found.firstName, 
        fatherName: found.fatherName,
        lastName: found.lastName,
        email: found.email, 
        isVerified: true, 
        joinedAt: found.joinedAt 
      };
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
    <AuthContext.Provider value={{ 
      user, isLoading, login, registerRequest, verifyAndRegister, 
      forgotPasswordRequest, resetPassword, logout 
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
