
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ar' | 'en';
}

const AuthModal: React.FC<Props> = ({ isOpen, onClose, lang }) => {
  const isRtl = lang === 'ar';
  const { login, register, verifyOTP } = useAuth();
  const [mode, setMode] = useState<'login' | 'register' | 'otp'>('login');
  const [formData, setFormData] = useState({ name: '', email: '', pass: '' });
  const [otpInput, setOtpInput] = useState('');
  const [sentOTP, setSentOTP] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const success = await login(formData.email, formData.pass);
    if (success) onClose();
    else setError(isRtl ? 'بيانات الاعتماد غير صحيحة' : 'Invalid credentials');
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const otp = await register(formData.name, formData.email, formData.pass);
    setSentOTP(otp);
    setMode('otp');
    setLoading(false);
    // Simulation alert
    alert(isRtl ? `رمز التحقق الخاص بك هو: ${otp}` : `Your verification code is: ${otp}`);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await verifyOTP(formData.email, otpInput, sentOTP, formData);
    if (success) onClose();
    else setError(isRtl ? 'رمز التحقق غير صحيح' : 'Invalid OTP code');
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#1a0f0a] border border-[#c5a059]/30 p-10 luxury-shadow">
        <div className="text-center mb-10">
          <span className="text-3xl font-bold tracking-[0.2em] text-[#c5a059] font-luxury">DAMAC</span>
          <h2 className="text-xl font-bold mt-4 text-white uppercase tracking-widest">
            {mode === 'login' ? (isRtl ? 'تسجيل الدخول' : 'LOGIN') : 
             mode === 'register' ? (isRtl ? 'إنشاء حساب جديد' : 'CREATE ACCOUNT') : 
             (isRtl ? 'التحقق من الحساب' : 'VERIFICATION')}
          </h2>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 text-xs mb-6 text-center">{error}</div>}

        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="email" placeholder={isRtl ? "البريد الإلكتروني" : "Email Address"} required
              className="w-full bg-black/40 border border-white/10 p-4 text-sm text-white focus:border-[#c5a059] outline-none"
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
            <input 
              type="password" placeholder={isRtl ? "كلمة المرور" : "Password"} required
              className="w-full bg-black/40 border border-white/10 p-4 text-sm text-white focus:border-[#c5a059] outline-none"
              onChange={e => setFormData({...formData, pass: e.target.value})}
            />
            <button className="w-full gold-gradient py-4 font-bold text-black uppercase text-xs tracking-widest hover:brightness-110 transition-all">
              {loading ? '...' : (isRtl ? 'دخول' : 'SIGN IN')}
            </button>
            <p className="text-center text-[10px] text-white/40 uppercase">
              {isRtl ? 'ليس لديك حساب؟' : "Don't have an account?"} 
              <button type="button" onClick={() => setMode('register')} className="text-[#c5a059] ml-2 font-bold underline">
                {isRtl ? 'سجل الآن' : 'REGISTER'}
              </button>
            </p>
          </form>
        )}

        {mode === 'register' && (
          <form onSubmit={handleRegister} className="space-y-6">
            <input 
              type="text" placeholder={isRtl ? "الاسم الكامل" : "Full Name"} required
              className="w-full bg-black/40 border border-white/10 p-4 text-sm text-white focus:border-[#c5a059] outline-none"
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
            <input 
              type="email" placeholder={isRtl ? "البريد الإلكتروني الرسمي" : "Official Email"} required
              className="w-full bg-black/40 border border-white/10 p-4 text-sm text-white focus:border-[#c5a059] outline-none"
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
            <input 
              type="password" placeholder={isRtl ? "كلمة المرور" : "Password"} required
              className="w-full bg-black/40 border border-white/10 p-4 text-sm text-white focus:border-[#c5a059] outline-none"
              onChange={e => setFormData({...formData, pass: e.target.value})}
            />
            <button className="w-full gold-gradient py-4 font-bold text-black uppercase text-xs tracking-widest">
               {isRtl ? 'إرسال رمز التحقق' : 'SEND OTP CODE'}
            </button>
            <button type="button" onClick={() => setMode('login')} className="w-full text-white/40 text-[10px] uppercase font-bold">
               {isRtl ? 'العودة لتسجيل الدخول' : 'Back to Login'}
            </button>
          </form>
        )}

        {mode === 'otp' && (
          <form onSubmit={handleVerify} className="space-y-6 text-center">
            <p className="text-xs text-white/60 leading-loose">
              {isRtl ? 'أدخل الرمز المكون من 6 أرقام المرسل إلى بريدك الإلكتروني' : 'Enter the 6-digit code sent to your email'}
            </p>
            <input 
              type="text" maxLength={6} required placeholder="000000"
              className="w-full bg-black/60 border border-[#c5a059] p-5 text-2xl text-center tracking-[1em] text-[#c5a059] outline-none"
              onChange={e => setOtpInput(e.target.value)}
            />
            <button className="w-full gold-gradient py-4 font-bold text-black uppercase text-xs tracking-widest">
               {isRtl ? 'تأكيد الحساب' : 'VERIFY ACCOUNT'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
