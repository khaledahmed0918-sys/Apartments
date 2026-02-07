
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { OTPData } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ar' | 'en';
}

type Mode = 'login' | 'register' | 'otp' | 'forgot' | 'reset';

const AuthModal: React.FC<Props> = ({ isOpen, onClose, lang }) => {
  const isRtl = lang === 'ar';
  const { login, requestOTP, verifyAndRegister, resetPassword } = useAuth();
  
  const [mode, setMode] = useState<Mode>('login');
  const [formData, setFormData] = useState({ 
    firstName: '', fatherName: '', lastName: '', 
    email: '', pass: '', newPass: '' 
  });
  const [otpInput, setOtpInput] = useState('');
  const [currentOtpData, setCurrentOtpData] = useState<OTPData | null>(null);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  if (!isOpen) return null;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await login(formData.email, formData.pass);
    if (res.success) onClose();
    else setError(isRtl ? 'بيانات الدخول غير صحيحة' : 'Invalid Credentials');
    setLoading(false);
  };

  const handleRegisterInit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await requestOTP(formData.email, 'register', formData);
    if (res.success && res.otpData) {
      setCurrentOtpData(res.otpData);
      setTimer(300);
      setMode('otp');
    } else {
      setError(isRtl ? 'فشل إرسال الرمز. تأكد من تشغيل السيرفر.' : 'Mail failed. Check server.');
    }
    setLoading(false);
  };

  const handleForgotInit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await requestOTP(formData.email, 'forgot');
    if (res.success && res.otpData) {
      setCurrentOtpData(res.otpData);
      setTimer(300);
      setMode('otp');
    } else {
      setError(res.message === 'Not found' ? (isRtl ? 'البريد غير مسجل' : 'Email not found') : (isRtl ? 'خطأ في السيرفر' : 'Server error'));
    }
    setLoading(false);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentOtpData) return;
    setLoading(true);
    setError('');

    if (currentOtpData.type === 'register') {
      const res = await verifyAndRegister(otpInput, currentOtpData);
      if (res.success) onClose();
      else setError(isRtl ? 'رمز غير صحيح أو منتهي' : 'Invalid or expired code');
    } else {
      if (otpInput === currentOtpData.code) setMode('reset');
      else setError(isRtl ? 'رمز غير صحيح' : 'Invalid code');
    }
    setLoading(false);
  };

  const handleResetFinal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentOtpData) return;
    setLoading(true);
    const res = await resetPassword(otpInput, currentOtpData, formData.newPass);
    if (res.success) onClose();
    else setError(isRtl ? 'حدث خطأ' : 'Error');
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#0d0805] border border-[#c5a059]/20 p-8 luxury-shadow">
        <div className="text-center mb-8">
           <h2 className="text-3xl font-luxury font-bold text-[#c5a059] tracking-widest">DAMAC</h2>
           <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] mt-2">
             {mode === 'login' ? (isRtl ? 'دخول الشركاء' : 'PARTNER LOGIN') : 
              mode === 'register' ? (isRtl ? 'عضوية جديدة' : 'NEW MEMBERSHIP') : 
              mode === 'otp' ? (isRtl ? 'التحقق من الهوية' : 'SECURITY VERIFICATION') : 
              (isRtl ? 'استعادة الوصول' : 'RECOVER ACCESS')}
           </p>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 text-[10px] mb-6 text-center font-bold uppercase tracking-widest animate-pulse">{error}</div>}

        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="email" placeholder={isRtl ? "البريد الإلكتروني" : "Email Address"} required
              className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#c5a059] outline-none transition-all"
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
            <input 
              type="password" placeholder={isRtl ? "كلمة المرور" : "Password"} required
              className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#c5a059] outline-none transition-all"
              onChange={e => setFormData({...formData, pass: e.target.value})}
            />
            <button type="button" onClick={() => setMode('forgot')} className="text-[10px] text-[#c5a059] uppercase font-bold hover:underline tracking-widest">
              {isRtl ? 'نسيت كلمة المرور؟' : 'Forgot Password?'}
            </button>
            <button className="w-full gold-gradient py-4 font-bold text-black uppercase text-xs tracking-widest hover:scale-[1.02] transition-transform">
              {loading ? '...' : (isRtl ? 'تسجيل الدخول' : 'SIGN IN')}
            </button>
            <p className="text-center text-[10px] text-white/40 uppercase tracking-widest">
              {isRtl ? 'ليس لديك حساب؟' : "Don't have an account?"} 
              <button type="button" onClick={() => setMode('register')} className="text-[#c5a059] ml-2 font-bold underline">
                {isRtl ? 'سجل الآن' : 'REGISTER'}
              </button>
            </p>
          </form>
        )}

        {mode === 'register' && (
          <form onSubmit={handleRegisterInit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
               <input 
                  type="text" placeholder={isRtl ? "الاسم" : "First"} required
                  className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:border-[#c5a059] outline-none"
                  onChange={e => setFormData({...formData, firstName: e.target.value})}
                />
               <input 
                  type="text" placeholder={isRtl ? "الأب" : "Father"} required
                  className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:border-[#c5a059] outline-none"
                  onChange={e => setFormData({...formData, fatherName: e.target.value})}
                />
               <input 
                  type="text" placeholder={isRtl ? "النسبة" : "Surname"} required
                  className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:border-[#c5a059] outline-none"
                  onChange={e => setFormData({...formData, lastName: e.target.value})}
                />
            </div>
            <input 
              type="email" placeholder={isRtl ? "البريد الإلكتروني الرسمي" : "Official Email"} required
              className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#c5a059] outline-none"
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
            <input 
              type="password" placeholder={isRtl ? "كلمة المرور" : "Password"} required
              className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#c5a059] outline-none"
              onChange={e => setFormData({...formData, pass: e.target.value})}
            />
            <button className="w-full gold-gradient py-4 font-bold text-black uppercase text-xs tracking-widest">
              {loading ? '...' : (isRtl ? 'إرسال الرمز للبريد' : 'SEND CODE TO MAIL')}
            </button>
            <button type="button" onClick={() => setMode('login')} className="w-full text-white/40 text-[9px] uppercase font-bold tracking-widest">
              {isRtl ? 'العودة' : 'CANCEL'}
            </button>
          </form>
        )}

        {mode === 'otp' && (
          <form onSubmit={handleVerify} className="space-y-8 text-center">
             <div className="space-y-2">
                <p className="text-[11px] text-white/60 uppercase tracking-[0.2em]">
                   {isRtl ? 'أدخل الرمز المكون من 6 أرقام' : 'Enter the 6-digit security code'}
                </p>
                <p className="text-[9px] text-[#c5a059] font-bold underline">{currentOtpData?.email}</p>
             </div>
             <div className="relative">
                <input 
                  type="text" maxLength={6} required placeholder="000000"
                  className="w-full bg-transparent border-b-2 border-[#c5a059] py-4 text-4xl text-center tracking-[0.5em] text-[#c5a059] outline-none font-luxury placeholder:opacity-10"
                  onChange={e => setOtpInput(e.target.value)}
                  autoFocus
                />
             </div>
             <div className="flex flex-col items-center gap-2">
                <div className="text-[#c5a059] font-mono text-2xl font-bold">{formatTime(timer)}</div>
                <p className="text-[8px] text-white/20 uppercase tracking-widest">{isRtl ? 'الرمز صالح لمدة 5 دقائق' : 'Code valid for 5 minutes'}</p>
             </div>
             <button disabled={timer === 0 || loading} className="w-full gold-gradient py-4 font-bold text-black uppercase text-xs tracking-widest disabled:opacity-20 hover:scale-[1.02] transition-all">
                {loading ? '...' : (isRtl ? 'تأكيد الرمز' : 'VERIFY CODE')}
             </button>
          </form>
        )}

        {mode === 'forgot' && (
          <form onSubmit={handleForgotInit} className="space-y-6">
            <h3 className="text-white text-xs font-bold uppercase tracking-widest text-center mb-4">{isRtl ? 'استعادة كلمة المرور' : 'Password Recovery'}</h3>
            <input 
              type="email" placeholder={isRtl ? "أدخل بريدك المسجل" : "Enter registered email"} required
              className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#c5a059] outline-none"
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
            <button className="w-full gold-gradient py-4 font-bold text-black uppercase text-xs tracking-widest">
               {loading ? '...' : (isRtl ? 'إرسال رمز الاستعادة' : 'SEND RESET CODE')}
            </button>
            <button type="button" onClick={() => setMode('login')} className="w-full text-white/40 text-[9px] uppercase font-bold">
               {isRtl ? 'إلغاء' : 'CANCEL'}
            </button>
          </form>
        )}

        {mode === 'reset' && (
          <form onSubmit={handleResetFinal} className="space-y-6">
            <h3 className="text-white text-xs font-bold uppercase tracking-widest text-center mb-4">{isRtl ? 'تعيين كلمة سر جديدة' : 'New Security Credentials'}</h3>
            <input 
              type="password" placeholder={isRtl ? "كلمة المرور الجديدة" : "New Password"} required
              className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#c5a059] outline-none"
              onChange={e => setFormData({...formData, newPass: e.target.value})}
            />
            <button className="w-full gold-gradient py-4 font-bold text-black uppercase text-xs tracking-widest">
               {loading ? '...' : (isRtl ? 'تحديث ودخول' : 'UPDATE & ACCESS')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
