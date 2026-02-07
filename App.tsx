
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LeadForm from './components/LeadForm';
import PropertyCard from './components/PropertyCard';
import Footer from './components/Footer';
import Modal from './components/Modal';
import { PROPERTIES, AMENITIES, COMMUNITY_DETAILS, RESOURCE_DETAILS, RENTAL_LINKS } from './constants';

const App: React.FC = () => {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    content: React.ReactNode;
  }>({
    isOpen: false,
    title: '',
    content: null,
  });

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const openModal = (title: string, content: React.ReactNode) => {
    setModalState({ isOpen: true, title, content });
  };

  const closeModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  const openWhatsApp = () => {
    const msg = lang === 'ar' 
      ? 'مرحباً، أود الاستفسار عن مشاريع داماك العقارية الحصرية' 
      : 'Hello, I would like to inquire about exclusive DAMAC properties';
    window.open(`https://wa.me/97180032622?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const scrollTo = (id: string) => {
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
      console.warn("Invalid selector prevented in App.tsx:", id);
    }
  };

  const isRtl = lang === 'ar';

  return (
    <div className={`min-h-screen relative selection:bg-[#c5a059] selection:text-black ${isRtl ? 'font-arabic' : 'font-sans'}`}>
      <Header onOpenModal={openModal} lang={lang} setLang={setLang} />
      <Hero />

      {/* Stats Section */}
      <section className="py-24 bg-[#0d0805] overflow-hidden border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative">
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#c5a059]/10 -translate-y-1/2 md:block hidden"></div>
            
            {(lang === 'ar' ? [
              { val: '120+', label: 'مشروع عالمي' },
              { val: '42K+', label: 'وحدة سكنية' },
              { val: '22+', label: 'عاماً من الخبرة' },
              { val: '08', label: 'وجهات حصرية' }
            ] : [
              { val: '120+', label: 'Global Projects' },
              { val: '42K+', label: 'Units Delivered' },
              { val: '22+', label: 'Years Experience' },
              { val: '08', label: 'Destinations' }
            ]).map((stat, idx) => (
              <div key={idx} className="text-center group relative z-10">
                <div className="text-5xl md:text-7xl font-luxury font-bold text-[#c5a059] mb-4 group-hover:scale-110 transition-transform duration-500">{stat.val}</div>
                <div className="text-[10px] text-white/40 uppercase tracking-[0.4em] font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 bg-[#1a0f0a] bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')]">
        <div className="container mx-auto px-6">
          <div className={`flex flex-col lg:flex-row gap-16 ${isRtl ? '' : 'flex-row-reverse'}`}>
            
            <div className="lg:w-2/3">
              <div className={`mb-16 ${isRtl ? 'text-right' : 'text-left'}`}>
                <div className={`flex items-center gap-4 mb-4 ${isRtl ? 'justify-start flex-row-reverse' : 'justify-start'}`}>
                  <div className="w-12 h-[1px] bg-[#c5a059]"></div>
                  <span className="text-[#c5a059] text-[10px] tracking-[0.4em] uppercase font-bold">
                    {isRtl ? 'مشاريع استثنائية' : 'Exclusive Projects'}
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-luxury font-bold mb-8">
                  {isRtl ? 'نخبة العقارات' : 'Elite Properties'} <br /> 
                  <span className="text-white/30 italic">{isRtl ? 'بتصاميم خشبية مودرن' : 'Modern Luxury Living'}</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {PROPERTIES[lang].map(p => (
                  <PropertyCard key={p.id} property={p} onOpenModal={openModal} isRtl={isRtl} />
                ))}
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="sticky top-32">
                <LeadForm onOpenModal={openModal} lang={lang} />
                
                <div className="mt-10 space-y-4">
                  <button 
                    onClick={openWhatsApp}
                    className="w-full bg-[#25D366] hover:bg-[#1ebd5e] text-white py-5 flex items-center justify-center gap-3 font-bold transition-all btn-trigger shadow-lg shadow-[#25D366]/10"
                  >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.417-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.305 1.652zm6.599-3.835c1.516.893 3.004 1.337 4.546 1.338 5.138 0 9.321-4.183 9.323-9.322.001-2.489-.965-4.831-2.724-6.59s-4.105-2.723-6.594-2.724c-5.139 0-9.323 4.183-9.325 9.322-.001 1.62.409 3.21 1.188 4.615l-1.06 3.871 3.967-1.041zm11.72-6.766c-.062-.103-.227-.164-.493-.297-.266-.133-1.573-.776-1.814-.863-.24-.087-.416-.131-.591.133-.175.265-.678.863-.83.1.033-.153.153-.297-.102-.43-.266-.133-.532.062-.85.347-1.011-.144-.131-.328-.215-.591-.347-.266-.133-1.053-.427-2.002-1.273-.734-.657-1.229-1.468-1.373-1.714-.144-.246-.015-.379.118-.512.12-.119.266-.31.399-.464.133-.153.177-.264.266-.441.088-.176.044-.331-.022-.464-.066-.133-.591-1.424-.81-1.954-.214-.518-.448-.448-.614-.456-.159-.008-.341-.01-.522-.01s-.475.068-.723.341-.947.925-.947 2.256 1.616 2.618 1.841 2.916c.224.298 3.18 4.856 7.703 6.811 1.077.465 1.918.742 2.574.95.1.081.031.213.107.592.519 1.121.232 1.616.106 1.743-.127.126-.296.223-.522.25z"/></svg>
                    <span>{isRtl ? 'محادثة فورية عبر واتساب' : 'WhatsApp Instant Chat'}</span>
                  </button>
                  <div className="text-center">
                    <button onClick={() => openModal(isRtl ? 'دليل المستثمر' : 'Investor Guide', <div className="p-8 text-center"><p className="text-[#c5a059] font-bold text-xl mb-4">{isRtl ? 'جاري تجهيز دليل المستثمر لعام 2024' : 'Preparing 2024 Investor Guide'}</p><p className="text-white/60">{isRtl ? 'سيصلك رابط التحميل مباشرة بعد التسجيل.' : 'Download link will be sent after registration.'}</p></div>)} className="text-[10px] text-white/40 uppercase tracking-widest hover:text-[#c5a059] transition-all underline underline-offset-8">
                      {isRtl ? 'تحميل دليل المستثمر 2024' : 'Download Investor Guide 2024'}
                    </button>
                  </div>
                  {/* Real Rent Link */}
                  <div className="mt-4">
                    <button 
                      onClick={() => window.open(RENTAL_LINKS[lang], '_blank')}
                      className="w-full bg-[#1a0f0a] border border-[#c5a059]/30 text-[#c5a059] py-4 font-bold text-xs uppercase tracking-widest btn-trigger hover:bg-[#c5a059]/10"
                    >
                      {isRtl ? 'استكشف وحدات للإيجار' : 'Explore Rental Units'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="about" className="py-32 bg-[#0d0805] relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#c5a059]/5 blur-[120px]"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-luxury font-bold mb-20">
            {isRtl ? 'عالم من المزايا الحصرية' : 'A World of Exclusive Amenities'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {AMENITIES[lang].map(a => (
              <div key={a.id} className="bg-[#1a0f0a] border border-white/5 hover:border-[#c5a059]/40 transition-all duration-500 group relative luxury-shadow overflow-hidden">
                <div className="aspect-square w-full relative">
                   <img src={a.image} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700" alt={a.name} />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a] to-transparent"></div>
                </div>
                <div className="p-8 relative -mt-16 z-10">
                  <h5 className="text-xl font-bold tracking-wide group-hover:text-[#c5a059] transition-colors">{a.name}</h5>
                  <button onClick={() => openModal(a.name, <div className={`text-center p-6 ${isRtl ? 'text-right' : 'text-left'}`}><img src={a.image} className="w-full h-64 object-cover border border-[#c5a059]/20 mb-6" /><p className="text-white/80 leading-relaxed">{isRtl ? `تفتخر داماك بتقديم أعلى مستويات الرفاهية العالمية من خلال ${a.name}، حيث نوفر لكل ساكن تجربة فريدة.` : `DAMAC is proud to offer global levels of luxury through ${a.name}, providing every resident with a unique experience.`}</p></div>)} className="mt-4 text-[9px] uppercase tracking-widest text-[#c5a059] underline btn-trigger">
                    {isRtl ? 'اكتشف المزيد' : 'Learn More'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer onOpenModal={openModal} lang={lang} />
      
      <button 
        onClick={() => { scrollTo('#'); }}
        className="fixed bottom-24 right-6 w-12 h-12 glass flex items-center justify-center text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-all z-40 btn-trigger rounded-full shadow-2xl"
      >
        ↑
      </button>

      {/* Sticky Bottom Actions */}
      <div className={`fixed bottom-0 left-0 right-0 grid grid-cols-2 gap-px bg-white/10 md:hidden z-[110] border-t border-white/10 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
        <button onClick={() => { scrollTo('#contact'); }} className="bg-[#0d0805] text-[#c5a059] py-5 font-bold uppercase text-[10px] tracking-widest btn-trigger">
          {isRtl ? 'تحدث معنا' : 'Chat with Us'}
        </button>
        <button onClick={() => { scrollTo('#contact'); }} className="gold-gradient text-black py-5 font-bold uppercase text-[10px] tracking-widest btn-trigger">
          {isRtl ? 'تحميل الكتالوج' : 'Download Catalog'}
        </button>
      </div>

      <Modal 
        isOpen={modalState.isOpen} 
        onClose={closeModal} 
        title={modalState.title} 
        content={modalState.content} 
      />
    </div>
  );
};

export default App;
