
import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

interface Props {
  onOpenModal: (title: string, content: React.ReactNode) => void;
  lang: 'ar' | 'en';
  setLang: (l: 'ar' | 'en') => void;
}

const Header: React.FC<Props> = ({ onOpenModal, lang, setLang }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (!id || id === '#' || id === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.querySelector(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const isRtl = lang === 'ar';

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled ? 'bg-[#0d0805]/98 backdrop-blur-2xl py-3 border-b border-white/5' : 'bg-transparent py-6'
        }`}
      >
        <div className={`container mx-auto px-6 flex items-center justify-between ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`flex items-center gap-10 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
            <button onClick={() => scrollToSection('#')} className="flex flex-col group items-start">
              <span className="text-2xl font-bold tracking-[0.2em] text-[#c5a059] font-luxury">DAMAC</span>
              <span className="text-[8px] tracking-[0.4em] text-white/40 uppercase -mt-1 font-bold">Properties</span>
            </button>
            
            <nav className={`hidden xl:flex items-center gap-10 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
              {NAV_LINKS[lang].map((link) => (
                <button 
                  key={link.label} 
                  onClick={() => scrollToSection(link.href)}
                  className="text-[10px] font-bold uppercase tracking-[0.2em] hover:text-[#c5a059] transition-all py-2"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div className={`flex items-center gap-6 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
             <div className="hidden lg:flex items-center gap-4 text-[10px] font-bold text-white/40">
                <button onClick={() => setLang('en')} className={lang === 'en' ? 'text-[#c5a059]' : ''}>EN</button>
                <div className="w-[1px] h-3 bg-white/10"></div>
                <button onClick={() => setLang('ar')} className={lang === 'ar' ? 'text-[#c5a059]' : ''}>AR</button>
             </div>

             {user ? (
               <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                 <div className={`${isRtl ? 'text-right' : 'text-left'} hidden sm:block`}>
                   <div className="text-[9px] font-bold text-[#c5a059] uppercase tracking-widest">{isRtl ? 'المستثمر المعتمد' : 'Verified Investor'}</div>
                   <div className="text-xs font-medium text-white/80">{user.firstName} {user.fatherName} {user.lastName}</div>
                 </div>
                 <button 
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/50 transition-all rounded-none"
                 >
                   <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                 </button>
               </div>
             ) : (
               <button 
                onClick={() => setAuthModalOpen(true)}
                className="bg-[#c5a059]/10 border border-[#c5a059]/40 text-[#c5a059] px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-[#c5a059] hover:text-black transition-all"
               >
                 {isRtl ? 'تسجيل الدخول' : 'Sign In'}
               </button>
             )}
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowLogoutConfirm(false)} />
          <div className="relative bg-[#0d0805] border border-white/10 p-10 max-w-sm w-full text-center luxury-shadow">
             <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-4">{isRtl ? 'تأكيد الخروج' : 'Confirm Logout'}</h3>
             <p className="text-white/40 text-[10px] uppercase tracking-widest mb-8 leading-loose">{isRtl ? 'هل أنت متأكد من إنهاء جلسة الاستثمار الحالية؟' : 'Are you sure you want to end your session?'}</p>
             <div className="flex gap-4">
                <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 border border-white/10 py-3 text-[10px] font-bold text-white uppercase tracking-widest">{isRtl ? 'إلغاء' : 'Cancel'}</button>
                <button onClick={() => { logout(); setShowLogoutConfirm(false); }} className="flex-1 bg-red-600 py-3 text-[10px] font-bold text-white uppercase tracking-widest">{isRtl ? 'خروج' : 'Logout'}</button>
             </div>
          </div>
        </div>
      )}

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} lang={lang} />
    </>
  );
};

export default Header;
