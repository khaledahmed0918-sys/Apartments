
import React from 'react';

const Hero: React.FC = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background with parallax effect simulation */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=90&w=2400" 
          className="w-full h-full object-cover brightness-[0.35] scale-105"
          alt="Dubai Skyline"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0b0b0b]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-8 py-1 px-4 border border-[#c5a059]/30 rounded-full backdrop-blur-sm bg-[#c5a059]/5 animate-bounce">
            <span className="text-[#c5a059] text-[10px] tracking-[0.4em] uppercase font-bold">إطلاق حصري لمشروع جديد</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-luxury font-bold mb-8 leading-[1.1] tracking-tight">
            أعد تعريف <br /> 
            <span className="gold-text-gradient italic">مفهوم الرفاهية</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            استثمر في عقارات تجمع بين التصميم المعماري الفريد ونمط الحياة العالمي في أكثر مدن العالم حيوية.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={scrollToProjects}
              className="w-full sm:w-auto gold-gradient text-black px-12 py-5 rounded-none font-bold text-lg hover:shadow-[0_0_30px_rgba(197,160,89,0.5)] transition-all btn-trigger"
            >
              استكشف المشاريع الحالية
            </button>
            <button 
              onClick={scrollToContact}
              className="w-full sm:w-auto bg-transparent border border-white/20 text-white px-12 py-5 rounded-none font-bold text-lg hover:bg-white/5 transition-all btn-trigger"
            >
              حمل الكتيب التعريفي
            </button>
          </div>
        </div>
      </div>

      {/* Floating Indicators */}
      <div className="absolute bottom-12 left-0 right-0 hidden md:flex justify-center gap-12 text-center opacity-50">
        <div className="space-y-1">
          <div className="text-xl font-luxury">01</div>
          <div className="text-[9px] uppercase tracking-widest">المواقع</div>
        </div>
        <div className="space-y-1 text-[#c5a059] opacity-100">
          <div className="text-xl font-luxury underline underline-offset-8">02</div>
          <div className="text-[9px] uppercase tracking-widest">المشاريع</div>
        </div>
        <div className="space-y-1">
          <div className="text-xl font-luxury">03</div>
          <div className="text-[9px] uppercase tracking-widest">التواصل</div>
        </div>
      </div>

      {/* Trust Badge */}
      <div className="absolute bottom-24 right-12 hidden lg:flex items-center gap-6 bg-black/40 backdrop-blur-xl border border-white/5 p-6 rounded-none luxury-shadow">
        <div className="w-12 h-12 bg-[#c5a059] flex items-center justify-center text-black font-bold text-xl font-luxury">D</div>
        <div>
          <div className="text-[#c5a059] font-bold text-lg">أفضل مطور عقاري</div>
          <div className="text-xs opacity-50">جوائز العقارات الخليجية 2024</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
