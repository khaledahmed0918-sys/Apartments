
import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';

interface Props {
  onOpenModal: (title: string, content: React.ReactNode) => void;
  lang: 'ar' | 'en';
  setLang: (l: 'ar' | 'en') => void;
}

const Header: React.FC<Props> = ({ onOpenModal, lang, setLang }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    try {
      const element = document.querySelector(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (e) {
      console.warn("Invalid selector prevented:", id);
    }
  };

  const handleLangToggle = (targetLang: 'ar' | 'en') => {
    setLang(targetLang);
    setMobileMenuOpen(false);
  };

  const isRtl = lang === 'ar';

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled ? 'bg-[#0d0805]/90 backdrop-blur-xl py-3 border-b border-white/5 shadow-2xl' : 'bg-transparent py-6'
        }`}
      >
        <div className={`container mx-auto px-6 flex items-center justify-between ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`flex items-center gap-8 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
            <button onClick={() => scrollToSection('#')} className={`flex flex-col group ${isRtl ? 'text-right' : 'text-left'}`}>
              <span className="text-2xl md:text-3xl font-bold tracking-[0.15em] text-[#c5a059] font-luxury group-hover:gold-text-gradient transition-all">DAMAC</span>
              <span className="text-[9px] tracking-[0.3em] text-white/50 uppercase -mt-1">Properties</span>
            </button>
            
            <nav className={`hidden lg:flex items-center gap-8 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
              {NAV_LINKS[lang].map((link) => (
                <button 
                  key={link.label} 
                  onClick={() => scrollToSection(link.href)}
                  className="text-xs font-bold uppercase tracking-widest hover:text-[#c5a059] transition-all relative group py-2"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a059] transition-all group-hover:w-full"></span>
                </button>
              ))}
            </nav>
          </div>

          <div className={`flex items-center gap-6 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`hidden xl:flex items-center gap-4 text-xs tracking-widest text-white/40 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
              <button onClick={() => handleLangToggle('en')} className={`${lang === 'en' ? 'text-[#c5a059] font-bold' : 'hover:text-white'} transition-colors uppercase`}>EN</button>
              <span className="h-3 w-[1px] bg-white/10"></span>
              <button onClick={() => handleLangToggle('ar')} className={`${lang === 'ar' ? 'text-[#c5a059] font-bold' : 'hover:text-white'} transition-colors uppercase`}>AR</button>
            </div>

            <a 
              href="tel:+97180032622" 
              className={`hidden md:flex items-center gap-2 text-xs font-bold tracking-widest hover:text-[#c5a059] transition-colors btn-trigger ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}
            >
               800 32622 <span className="opacity-40">{isRtl ? ':دعم 24/7' : 'Support 24/7:'}</span>
            </a>
            
            <button 
              onClick={() => scrollToSection('#contact')}
              className={`hidden sm:block gold-gradient text-black px-8 py-3 rounded-none font-bold text-[10px] tracking-[0.2em] uppercase hover:shadow-[0_0_25px_rgba(197,160,89,0.4)] transition-all btn-trigger`}
            >
              {isRtl ? 'سجل اهتمامك' : 'Register Interest'}
            </button>

            <button 
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-50 btn-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className={`w-6 h-[1.5px] bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`}></span>
              <span className={`w-6 h-[1.5px] bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-[1.5px] bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-[4.5px]' : ''}`}></span>
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-[90] bg-[#0d0805] flex flex-col items-center justify-center transition-all duration-700 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="flex flex-col items-center gap-8 text-center">
          {NAV_LINKS[lang].map((link) => (
            <button 
              key={link.label} 
              onClick={() => scrollToSection(link.href)}
              className="text-2xl font-luxury font-bold hover:text-[#c5a059] transition-all"
            >
              {link.label}
            </button>
          ))}
          <div className="mt-12 space-y-4">
             <button onClick={() => scrollToSection('#contact')} className="gold-gradient text-black px-12 py-4 font-bold rounded-none">
               {isRtl ? 'احجز الآن' : 'Book Now'}
             </button>
             <div className="flex justify-center gap-6 pt-4">
                <button onClick={() => handleLangToggle('ar')} className={lang === 'ar' ? 'text-[#c5a059]' : 'text-white/40'}>AR</button>
                <span className="opacity-20">|</span>
                <button onClick={() => handleLangToggle('en')} className={lang === 'en' ? 'text-[#c5a059]' : 'text-white/40'}>EN</button>
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
