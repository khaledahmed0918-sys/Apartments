
import React from 'react';
import { Property } from '../types';

interface Props {
  property: Property;
  onOpenModal: (title: string, content: React.ReactNode) => void;
  isRtl: boolean;
}

const PropertyCard: React.FC<Props> = ({ property, onOpenModal, isRtl }) => {
  const handleDetailsClick = () => {
    onOpenModal(property.title, (
      <div className={`space-y-6 ${isRtl ? 'text-right' : 'text-left'}`}>
        <img src={property.image} className="w-full h-64 object-cover border border-[#c5a059]/20" alt={property.title} />
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <div className={isRtl ? 'order-1' : 'order-1'}>
            <h4 className="text-[#c5a059] font-bold text-lg mb-2">{isRtl ? 'عن المشروع' : 'About the Project'}</h4>
            <p className="text-white/70 leading-relaxed text-sm">
              {isRtl 
                ? `يقدم مشروع ${property.title} في ${property.location} تجربة عيش غير مسبوقة، حيث تم تصميم كل وحدة بعناية فائقة لتوفير الراحة والرفاهية المطلقة.`
                : `${property.title} in ${property.location} offers an unprecedented living experience, where every unit is meticulously designed for comfort and absolute luxury.`
              }
            </p>
          </div>
          <div className="bg-black/40 p-6 border border-white/5 space-y-3 order-2">
             <div className={`flex justify-between text-xs ${isRtl ? 'flex-row-reverse' : ''}`}>
                <span className="text-white/40">{isRtl ? 'الموقع' : 'Location'}</span>
                <span className="text-white font-bold">{property.location}</span>
             </div>
             <div className={`flex justify-between text-xs ${isRtl ? 'flex-row-reverse' : ''}`}>
                <span className="text-white/40">{isRtl ? 'النوع' : 'Type'}</span>
                <span className="text-white font-bold">{property.type}</span>
             </div>
             <div className={`flex justify-between text-xs ${isRtl ? 'flex-row-reverse' : ''}`}>
                <span className="text-white/40">{isRtl ? 'المساحة' : 'Area'}</span>
                <span className="text-white font-bold">{property.beds}</span>
             </div>
             <div className={`flex justify-between text-xs ${isRtl ? 'flex-row-reverse' : ''}`}>
                <span className="text-white/40">{isRtl ? 'الاستثمار' : 'Investment'}</span>
                <span className="text-[#c5a059] font-bold">{property.price}</span>
             </div>
          </div>
        </div>
        <button onClick={() => {
           document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'});
        }} className="w-full gold-gradient py-4 text-black font-bold uppercase tracking-widest text-xs">
           {isRtl ? 'أرغب في حجز هذه الوحدة' : 'I wish to book this unit'}
        </button>
      </div>
    ));
  };

  return (
    <div className="group relative bg-[#0d0805] overflow-hidden border border-white/5 transition-all duration-500 hover:border-[#c5a059]/30 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] card-3d">
      <div className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 brightness-75 group-hover:brightness-100"
        />
        <div className={`absolute top-6 ${isRtl ? 'right-6' : 'left-6'} glass text-[#c5a059] text-[9px] px-4 py-1.5 font-bold rounded-none uppercase tracking-widest`}>
          {property.type}
        </div>
        
        {/* Modern Overlay - Simpler focus now */}
        <div className="absolute inset-0 bg-[#0d0805]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-4">
           <button 
            onClick={handleDetailsClick}
            className="bg-white text-black px-8 py-3 font-bold text-[10px] uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-2xl btn-trigger"
           >
            {isRtl ? 'عرض التفاصيل' : 'View Details'}
           </button>
        </div>
      </div>
      
      <div className={`p-8 border-t border-white/5 bg-gradient-to-b from-transparent to-[#1a0f0a]/30 ${isRtl ? 'text-right' : 'text-left'}`}>
        <h4 className="text-2xl font-luxury font-bold mb-2 group-hover:text-[#c5a059] transition-colors">{property.title}</h4>
        <p className={`text-white/40 text-xs tracking-wider mb-6 flex items-center gap-2 ${isRtl ? 'justify-end' : 'justify-start'}`}>
          {!isRtl && <span className="w-1.5 h-1.5 bg-[#c5a059] rounded-full shadow-[0_0_8px_#c5a059]"></span>}
          {property.location}
          {isRtl && <span className="w-1.5 h-1.5 bg-[#c5a059] rounded-full shadow-[0_0_8px_#c5a059]"></span>}
        </p>
        
        <div className={`flex items-center justify-between border-t border-white/5 pt-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <div className={isRtl ? 'text-right' : 'text-left'}>
            <span className="text-[10px] text-white/30 block uppercase tracking-widest mb-1">{isRtl ? 'الاستثمار' : 'Investment'}</span>
            <span className="text-[#c5a059] font-bold text-lg tracking-tight">{property.price}</span>
          </div>
          <div className={isRtl ? 'text-left' : 'text-right'}>
            <span className="text-[10px] text-white/30 block uppercase tracking-widest mb-1">{isRtl ? 'المساحة' : 'Area'}</span>
            <span className="text-white font-medium">{property.beds}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
