
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LeadForm from './components/LeadForm';
import PropertyCard from './components/PropertyCard';
import Footer from './components/Footer';
import Modal from './components/Modal';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PROPERTIES, AMENITIES } from './constants';

const MainApp: React.FC = () => {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const { user } = useAuth();
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

  const isRtl = lang === 'ar';

  return (
    <div className={`min-h-screen relative selection:bg-[#c5a059] selection:text-black bg-[#0d0805]`}>
      <Header onOpenModal={(t, c) => setModalState({isOpen: true, title: t, content: c})} lang={lang} setLang={setLang} />
      <Hero />

      {/* Corporate Identity Section */}
      <section className="py-24 border-y border-white/5 bg-[#0d0805]">
        <div className="container mx-auto px-6">
          <div className={`flex flex-col lg:flex-row items-center gap-20 ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
             <div className="lg:w-1/2">
                <div className="inline-block px-4 py-1 border border-[#c5a059]/30 text-[#c5a059] text-[9px] uppercase font-bold tracking-[0.3em] mb-6">DAMAC Corporate</div>
                <h2 className="text-4xl md:text-6xl font-luxury font-bold mb-8 leading-tight">
                  {isRtl ? 'إرث من الفخامة والريادة' : 'A Legacy of Luxury and Vision'}
                </h2>
                <p className="text-white/50 leading-loose mb-10 text-lg">
                  {isRtl 
                    ? 'منذ تأسيسها، أحدثت داماك العقارية تحولاً جذرياً في المشهد العمراني في دبي والمنطقة، من خلال تقديم مشاريع أيقونية تجسد الرفاهية في أبهى صورها وتوفر عوائد استثمارية مستدامة.'
                    : 'Since its inception, DAMAC Properties has revolutionized the skyline of Dubai and the region, delivering iconic projects that embody luxury and provide sustainable investment returns.'}
                </p>
                <div className="grid grid-cols-2 gap-8">
                   <div>
                      <div className="text-3xl font-luxury text-[#c5a059] font-bold">22+</div>
                      <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest">{isRtl ? 'عام من التميز' : 'Years of Excellence'}</div>
                   </div>
                   <div>
                      <div className="text-3xl font-luxury text-[#c5a059] font-bold">42K+</div>
                      <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest">{isRtl ? 'وحدة تم تسليمها' : 'Units Delivered'}</div>
                   </div>
                </div>
             </div>
             <div className="lg:w-1/2 relative">
                <img 
                  src="https://images.unsplash.com/photo-1574950578143-858c6fc58922?auto=format&fit=crop&q=80&w=1200" 
                  className="w-full h-[500px] object-cover border border-white/5" 
                  alt="Office" 
                  loading="lazy"
                />
                <div className="absolute -bottom-10 -right-10 bg-[#c5a059] p-10 hidden xl:block">
                   <div className="text-black font-bold text-4xl font-luxury">01</div>
                   <div className="text-black/60 text-[10px] font-bold uppercase tracking-widest">{isRtl ? 'المطور الأول عالمياً' : 'World-Class Developer'}</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-32 bg-[#1a0f0a]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
             <h2 className="text-4xl md:text-5xl font-luxury font-bold mb-6">{isRtl ? 'محفظة المشاريع الحصرية' : 'Exclusive Portfolio'}</h2>
             <div className="w-20 h-[1px] bg-[#c5a059] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {PROPERTIES[lang].map(p => (
              <PropertyCard key={p.id} property={p} onOpenModal={(t, c) => setModalState({isOpen: true, title: t, content: c})} isRtl={isRtl} />
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-32 bg-[#0d0805]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
             <h2 className="text-4xl md:text-5xl font-luxury font-bold mb-6">{isRtl ? 'مرافق تليق بالملوك' : 'Amenities Fit for Royalty'}</h2>
             <p className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-bold">{isRtl ? 'خدماتنا الاستثنائية' : 'Exceptional Services'}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AMENITIES[lang].map((amenity) => (
              <div key={amenity.id} className="relative group overflow-hidden border border-white/5 aspect-square">
                <img 
                  src={amenity.image} 
                  alt={amenity.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-50" 
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                  <span className="text-white font-luxury text-xl tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                    {amenity.name}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#c5a059] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User-Only Investor Dashboard Mockup */}
      {user && (
        <section className="py-32 bg-[#0d0805] border-t border-[#c5a059]/20">
          <div className="container mx-auto px-6">
             <div className={`flex flex-col md:flex-row justify-between items-end mb-16 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
                <div className={isRtl ? 'text-right' : 'text-left'}>
                   <h2 className="text-3xl font-luxury font-bold text-[#c5a059] mb-2">{isRtl ? 'لوحة تحكم المستثمر' : 'Investor Dashboard'}</h2>
                   <p className="text-white/40 text-xs uppercase tracking-widest">{isRtl ? 'مرحباً بك مجدداً في عائلتنا' : 'Welcome back to the family'}</p>
                </div>
                <div className="flex gap-4 mt-8 md:mt-0">
                   <button className="px-6 py-2 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white hover:border-white transition-all">{isRtl ? 'ملف الاستثمار' : 'Investment Profile'}</button>
                   <button className="px-6 py-2 gold-gradient text-[10px] font-bold uppercase tracking-widest text-black shadow-lg shadow-[#c5a059]/20">{isRtl ? 'تحميل العقود' : 'Download Contracts'}</button>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { t: isRtl ? 'قيمة المحفظة' : 'Portfolio Value', v: '2.4M AED', i: '📈' },
                  { t: isRtl ? 'المشاريع المفضلة' : 'Watchlist', v: '04 Projects', i: '⭐️' },
                  { t: isRtl ? 'دفعات الصيانة' : 'Maintenance', v: 'Up to date', i: '✅' }
                ].map((card, i) => (
                  <div key={i} className="bg-white/5 p-8 border border-white/5 relative overflow-hidden group">
                     <div className="text-4xl mb-4">{card.i}</div>
                     <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1 font-bold">{card.t}</div>
                     <div className="text-2xl font-bold text-white">{card.v}</div>
                     <div className="absolute top-0 right-0 w-16 h-16 bg-[#c5a059]/5 rounded-bl-full transition-all group-hover:scale-150"></div>
                  </div>
                ))}
             </div>
          </div>
        </section>
      )}

      {/* Lead Form Section */}
      <section id="contact" className="py-32 bg-[#1a0f0a] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
             <LeadForm onOpenModal={(t, c) => setModalState({isOpen: true, title: t, content: c})} lang={lang} />
          </div>
        </div>
      </section>

      <Footer onOpenModal={(t, c) => setModalState({isOpen: true, title: t, content: c})} lang={lang} />
      
      <Modal 
        isOpen={modalState.isOpen} 
        onClose={() => setModalState({...modalState, isOpen: false})} 
        title={modalState.title} 
        content={modalState.content} 
      />
    </div>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <MainApp />
  </AuthProvider>
);

export default App;
