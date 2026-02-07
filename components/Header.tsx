
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
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
          isScrolled ? 'bg-[#0d0805]/95 backdrop-blur-2xl py-3 border-b border-white/5' : 'bg-transparent py-6'
        }`}
      >
        <div className={`container mx-auto px-6 flex items-center justify-between ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`flex items-center gap-10 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
            <button onClick={() => scrollToSection('#')} className="flex flex-col group">
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
                <button onClick={() => setLang('ar')} className={lang === 'ar' ? 'text-[#c5a059]' : ''}>AR</button>
             </div>

             {user ? (
               <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                 <div className="text-right hidden sm:block">
                   <div className="text-[10px] font-bold text-[#c5a059] uppercase">{isRtl ? 'مرحباً مستثمرنا' : 'Welcome Partner'}</div>
                   <div className="text-xs font-medium text-white/80">{user.name}</div>
                 </div>
                 <button 
                  onClick={logout}
                  className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/50 transition-all"
                  title={isRtl ? "تسجيل خروج" : "Logout"}
                 >
                   <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                 </button>
               </div>
             ) : (
               <button 
                onClick={() => setAuthModalOpen(true)}
                className="bg-white/5 border border-white/10 px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-[#c5a059] hover:text-black transition-all"
               >
                 {isRtl ? 'دخول المستثمرين' : 'Investor Login'}
               </button>
             )}

             <button 
                className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className={`w-6 h-[1px] bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-[2.5px]' : ''}`}></span>
                <span className={`w-6 h-[1px] bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-6 h-[1px] bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-[2.5px]' : ''}`}></span>
              </button>
          </div>
        </div>
      </header>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} lang={lang} />
    </>
  );
};

export default Header;
