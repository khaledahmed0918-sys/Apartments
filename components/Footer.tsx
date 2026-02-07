
import React from 'react';
import { COMMUNITY_DETAILS, RESOURCE_DETAILS, RENTAL_LINKS } from '../constants';

interface Props {
  onOpenModal: (title: string, content: React.ReactNode) => void;
  lang: 'ar' | 'en';
}

const Footer: React.FC<Props> = ({ onOpenModal, lang }) => {
  const isRtl = lang === 'ar';
  
  const socialClick = (name: string) => {
    let url = '#';
    switch(name) {
      case 'Facebook': url = 'https://www.facebook.com/damacofficial'; break;
      case 'X': url = 'https://twitter.com/damacofficial'; break;
      case 'Instagram': url = 'https://www.instagram.com/damacofficial/'; break;
      case 'LinkedIn': url = 'https://www.linkedin.com/company/damac-properties'; break;
    }
    window.open(url, '_blank');
  };

  const openCommunity = (name: string) => {
    const detail = COMMUNITY_DETAILS[lang][name];
    if (detail) {
      onOpenModal(detail.title, detail.content);
    }
  };

  const openResource = (slug: string) => {
    const detail = RESOURCE_DETAILS[lang][slug];
    if (detail) {
      onOpenModal(detail.title, detail.content);
    }
  };

  const openMap = () => {
    onOpenModal(isRtl ? 'موقع المقر الرئيسي' : 'Headquarters Location', (
      <div className="space-y-4">
        <div className="aspect-video w-full bg-zinc-900 border border-white/10 flex items-center justify-center">
           <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.203668102796!2d55.25301387612735!3d25.095213635832717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b6e6b4f6b5b%3A0x6b4f6b5b6b4f6b5b!2sExecutive%20Heights!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
           ></iframe>
        </div>
        <p className="text-white/60 text-sm">
           {isRtl ? 'برج داماك التنفيذي (Executive Heights)، الخليج التجاري، دبي.' : 'DAMAC Executive Heights, Business Bay, Dubai.'}
        </p>
      </div>
    ));
  };

  return (
    <footer className="bg-[#0d0805] border-t border-white/5 py-20">
      <div className="container mx-auto px-6">
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-16 mb-16 ${isRtl ? 'text-right' : 'text-left'}`}>
          <div className="col-span-1">
            <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className={`flex flex-col mb-8 group w-full ${isRtl ? 'items-end' : 'items-start'}`}>
              <span className="text-3xl font-bold tracking-widest text-[#c5a059] font-luxury group-hover:gold-text-gradient transition-all">DAMAC</span>
              <span className="text-[10px] tracking-[0.2em] text-white/70 uppercase">Properties</span>
            </button>
            <p className="text-white/30 text-xs leading-relaxed mb-8 font-light">
              {isRtl 
                ? 'منذ عام 2002، كانت داماك العقارية في طليعة سوق العقارات الفاخرة، حيث قدمت مشاريع سكنية وتجارية عالمية.'
                : 'Since 2002, DAMAC Properties has been at the forefront of the luxury real estate market, delivering world-class projects.'
              }
            </p>
          </div>
          
          <div>
            <h5 className="text-[#c5a059] font-bold mb-8 text-xs uppercase tracking-widest">{isRtl ? 'المجتمعات الحصرية' : 'Exclusive Communities'}</h5>
            <ul className="space-y-4 text-[11px] text-white/50 uppercase tracking-widest font-bold">
              {(isRtl ? ['داماك هيلز', 'داماك لاجونز', 'وسط مدينة دبي', 'داماك كازا'] : ['DAMAC Hills', 'DAMAC Lagoons']).map(comm => (
                <li key={comm}><button onClick={() => openCommunity(comm)} className="hover:text-white transition-colors">{comm}</button></li>
              ))}
              <li><a href={RENTAL_LINKS[lang]} target="_blank" className="hover:text-white transition-colors border-b border-[#c5a059]/30">{isRtl ? 'وحدات للإيجار' : 'Rental Units'}</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[#c5a059] font-bold mb-8 text-xs uppercase tracking-widest">{isRtl ? 'الموارد' : 'Resources'}</h5>
            <ul className="space-y-4 text-[11px] text-white/50 uppercase tracking-widest font-bold">
              <li><button onClick={() => openResource('investor-relations')} className="hover:text-white transition-colors">{isRtl ? 'علاقات المستثمرين' : 'Investor Relations'}</button></li>
              <li><button onClick={() => openResource('newsroom')} className="hover:text-white transition-colors">{isRtl ? 'غرفة الأخبار' : 'Newsroom'}</button></li>
              <li><button onClick={() => onOpenModal(isRtl ? 'كتيب الشركة' : 'Company Catalog', <div className="text-center p-8"><p className="text-[#c5a059] font-bold mb-4">Coming Soon...</p></div>)} className="hover:text-white transition-colors">{isRtl ? 'كتيب الشركة' : 'Company Catalog'}</button></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[#c5a059] font-bold mb-8 text-xs uppercase tracking-widest">{isRtl ? 'المقر الرئيسي' : 'Headquarters'}</h5>
            <div className="text-white/40 text-[11px] mb-8 leading-relaxed font-light">
              Executive Heights, Business Bay, <br /> Dubai, UAE.
            </div>
            <button onClick={openMap} className={`text-[#c5a059] text-[10px] uppercase font-bold tracking-widest mb-6 hover:underline block ${isRtl ? 'ml-auto' : 'mr-auto'}`}>
              {isRtl ? 'عرض الموقع على الخريطة' : 'View on Map'}
            </button>
            <div className={`flex gap-4 ${isRtl ? 'justify-end' : 'justify-start'}`}>
               {['Facebook', 'X', 'Instagram', 'LinkedIn'].map((soc) => (
                 <button 
                  key={soc}
                  onClick={() => socialClick(soc)}
                  className="w-9 h-9 glass rounded-none flex items-center justify-center text-[10px] text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-all btn-trigger border border-[#c5a059]/10"
                 >
                   {soc.charAt(0)}
                 </button>
               ))}
            </div>
          </div>
        </div>
        
        <div className={`pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
          <div className={`text-[9px] text-white/20 uppercase tracking-[0.3em] font-medium ${isRtl ? 'text-right' : 'text-left'}`}>
            {isRtl ? 'جميع الحقوق محفوظة © 2024 داماك العقارية ش.م.ع' : 'All Rights Reserved © 2024 DAMAC Properties PJSC'}
          </div>
          <div className={`flex gap-8 text-[9px] text-white/40 uppercase tracking-[0.1em] ${isRtl ? 'flex-row-reverse' : ''}`}>
            <span>{isRtl ? 'التطوير بواسطة فريق داماك الرقمي' : 'Developed by DAMAC Digital'}</span>
            <span className="text-[#c5a059]/40">UAE | KSA | LONDON</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
