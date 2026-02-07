
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ar' | 'en';
}

type AuthMode = 'login' | 'register' | 'otp_reg' | 'forgot' | 'otp_forgot' | 'reset_pass';

const AuthModal: React.FC<Props> = ({ isOpen, onClose, lang }) => {
  const isRtl = lang === 'ar';
  const { login, registerRequest, verifyAndRegister, forgotPasswordRequest, resetPassword } = useAuth();
  
  const [mode, setMode] = useState<AuthMode>('login');
  const [formData, setFormData] = useState({ 
    firstName: '', fatherName: '', lastName: '', 
    email: '', pass: '', newPass: '' 
  });
  const [otpInput, setOtpInput] = useState('');
  const [sentOTP, setSentOTP] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    let interval: any;
    if ((mode === 'otp_reg' || mode === 'otp_forgot') && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0) {
      setError(isRtl ? 'انتهت صلاحية الرمز. يرجى المحاولة مجدداً.' : 'Code expired. Please try again.');
    }
    return () => clearInterval(interval);
  }, [mode, timer, isRtl]);

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
    else setError(isRtl ? 'البريد أو كلمة المرور غير صحيحة' : 'Invalid email or password');
    setLoading(false);
  };

  const handleRegisterInit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const otp = await registerRequest(formData);
    setSentOTP(otp);
    setTimer(300);
    setMode('otp_reg');
    setLoading(false);
  };

  const handleVerifyRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (timer === 0) return;
    setLoading(true);
    const success = await verifyAndRegister(otpInput, sentOTP, formData);
    if (success) onClose();
    else setError(isRtl ? 'رمز التحقق غير صحيح' : 'Invalid OTP');
    setLoading(false);
  };

  const handleForgotInit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const otp = await forgotPasswordRequest(formData.email);
    if (otp) {
      setSentOTP(otp);
      setTimer(300);
      setMode('otp_forgot');
    } else {
      setError(isRtl ? 'البريد غير مسجل لدينا' : 'Email not found');
    }
    setLoading(false);
  };

  const handleVerifyForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput === sentOTP) setMode('reset_pass');
    else setError(isRtl ? 'رمز غير صحيح' : 'Invalid code');
  };

  const handleResetFinal = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await resetPassword(formData.email, otpInput, sentOTP, formData.newPass);
    if (success) onClose();
    else setError(isRtl ? 'فشل تحديث كلمة المرور' : 'Failed to reset password');
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/98 backdrop-blur-2xl" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[#0d0805] border border-[#c5a059]/20 p-8 md:p-12 luxury-shadow">
        <div className="text-center mb-10">
          <span className="text-4xl font-bold tracking-[0.3em] text-[#c5a059] font-luxury">DAMAC</span>
          <div className="h-[1px] w-12 bg-[#c5a059]/40 mx-auto mt-4"></div>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 text-[10px] mb-6 text-center font-bold uppercase tracking-widest">{error}</div>}

        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-6">
            <h2 className="text-white text-center text-xs font-bold tracking-[0.2em] uppercase mb-8">{isRtl ? 'دخول الشركاء' : 'Partner Login'}</h2>
            <input 
              type="email" placeholder={isRtl ? "البريد الإلكتروني" : "Email"} required
              className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#c5a059] outline-none transition-all"
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
            <input 
              type="password" placeholder={isRtl ? "كلمة المرور" : "Password"} required
              className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#c5a059] outline-none transition-all"
              onChange={e => setFormData({...formData, pass: e.target.value})}
            />
            <div className="flex justify-between items-center text-[10px] font-bold text-white/40 uppercase tracking-widest">
              <button type="button" onClick={() => setMode('forgot')} className="hover:text-[#c5a059]">{isRtl ? 'نسيت كلمة المرور؟' : 'Forgot Password?'}</button>
            </div>
            <button className="w-full gold-gradient py-4 font-bold text-black uppercase text-xs tracking-widest hover:scale-[1.02] transition-all duration-300">
              {loading ? '...' : (isRtl ? 'تسجيل الدخول' : 'Sign In')}
            </button>
            <p className="text-center text-[10px] text-white/40 uppercase tracking-widest">
              {isRtl ? 'عضو جديد؟' : 'New Member?'} 
              <button type="button" onClick={() => setMode('register')} className="text-[#c5a059] ml-2 font-bold hover:underline">
                {isRtl ? 'إنشاء حساب استثماري' : 'Create Account'}
              </button>
            </p>
          </form>
        )}

        {mode === 'register' && (
          <form onSubmit={handleRegisterInit} className="space-y-5">
            <h2 className="text-white text-center text-xs font-bold tracking-[0.2em] uppercase mb-6">{isRtl ? 'طلب انضمام للمستثمرين' : 'Investor Registration'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input 
                type="text" placeholder={isRtl ? "الاسم الأول" : "First Name"} required
                className="bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#c5a059] outline-none"
                onChange={e => setFormData({...formData, firstName: e.target.value})}
              />
              <input 
                type="text" placeholder={isRtl ? "اسم الأب" : "Father Name"} required
                className="bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#c5a059] outline-none"
                onChange={e => setFormData({...formData, fatherName: e.target.value})}
              />
              <input 
                type="text" placeholder={isRtl ? "النسبة / اللقب" : "Surname"} required
                className="bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#c5a059] outline-none"
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
            <button className="w-full gold-gradient py-4 font-bold text-black uppercase text-xs tracking-widest mt-4">
               {isRtl ? 'إرسال رمز التفعيل للبريد' : 'Verify Email Address'}
            </button>
            <button type="button" onClick={() => setMode('login')} className="w-full text-white/40 text-[9px] uppercase font-bold tracking-[0.3em]">
               {isRtl ? 'العودة' : 'Back to Login'}
            </button>
          </form>
        )}

        {(mode === 'otp_reg' || mode === 'otp_forgot') && (
          <form onSubmit={mode === 'otp_reg' ? handleVerifyRegister : handleVerifyForgot} className="space-y-8 text-center">
            <div className="space-y-2">
              <h2 className="text-[#c5a059] text-xs font-bold tracking-widest uppercase">{isRtl ? 'تحقق من بريدك الوارد' : 'Check Your Inbox'}</h2>
              <p className="text-[10px] text-white/40 uppercase tracking-widest leading-relaxed">
                {isRtl ? `أرسلنا الرمز إلى ${formData.email}` : `Code sent to ${formData.email}`}
              </p>
            </div>
            <div className="relative">
              <input 
                type="text" maxLength={6} required placeholder="------"
                className="w-full bg-transparent border-b-2 border-[#c5a059] py-4 text-4xl text-center tracking-[0.5em] text-[#c5a059] outline-none font-luxury"
                onChange={e => setOtpInput(e.target.value)}
              />
            </div>
            <div className="text-[#c5a059] font-bold text-xl font-mono">{formatTime(timer)}</div>
            <button disabled={timer === 0} className="w-full gold-gradient py-4 font-bold text-black uppercase text-xs tracking-widest disabled:opacity-30">
               {isRtl ? 'تأكيد الرمز' : 'Verify Code'}
            </button>
          </form>
        )}

        {mode === 'forgot' && (
          <form onSubmit={handleForgotInit} className="space-y-6">
            <h2 className="text-white text-center text-xs font-bold tracking-[0.2em] uppercase mb-4">{isRtl ? 'استعادة الوصول' : 'Reset Access'}</h2>
            <p className="text-[10px] text-white/40 text-center uppercase tracking-widest">{isRtl ? 'أدخل بريدك وسنرسل لك رمزاً لتغيير كلمة السر' : 'Enter email to receive reset code'}</p>
            <input 
              type="email" placeholder={isRtl ? "البريد الإلكتروني" : "Email"} required
              className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#c5a059] outline-none"
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
            <button className="w-full gold-gradient py-4 font-bold text-black uppercase text-xs tracking-widest">
               {isRtl ? 'إرسال الرمز' : 'Send Code'}
            </button>
            <button type="button" onClick={() => setMode('login')} className="w-full text-white/40 text-[9px] uppercase font-bold tracking-[0.3em]">
               {isRtl ? 'إلغاء' : 'Cancel'}
            </button>
          </form>
        )}

        {mode === 'reset_pass' && (
          <form onSubmit={handleResetFinal} className="space-y-6">
            <h2 className="text-white text-center text-xs font-bold tracking-[0.2em] uppercase mb-4">{isRtl ? 'كلمة مرور جديدة' : 'New Password'}</h2>
            <input 
              type="password" placeholder={isRtl ? "كلمة المرور الجديدة" : "New Password"} required
              className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#c5a059] outline-none"
              onChange={e => setFormData({...formData, newPass: e.target.value})}
            />
            <button className="w-full gold-gradient py-4 font-bold text-black uppercase text-xs tracking-widest">
               {isRtl ? 'تحديث ودخول' : 'Update & Login'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
