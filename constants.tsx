
import React from 'react';
import { Property, Amenity, NavLink } from './types';

export const COLORS = {
  primary: '#c5a059',
  secondary: '#0b0b0b',
  accent: '#ffffff',
};

export const NAV_LINKS: Record<string, NavLink[]> = {
  ar: [
    { label: 'الرئيسية', href: '#' },
    { label: 'المشاريع الحصرية', href: '#projects' },
    { label: 'عن المجموعة', href: '#about' },
    { label: 'تواصل معنا', href: '#contact' },
  ],
  en: [
    { label: 'Home', href: '#' },
    { label: 'Projects', href: '#projects' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]
};

export const PROPERTIES: Record<string, Property[]> = {
  ar: [
    {
      id: '1',
      title: 'داماك باي باي كافالي',
      location: 'ميناء دبي، دبي',
      price: 'بدءاً من 2.9M د.إ',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
      type: 'شقق بحرية',
      beds: '1-3 غرف',
    },
    {
      id: '2',
      title: 'سافاير في داماك هيلز',
      location: 'مجتمع داماك هيلز، دبي',
      price: 'بدءاً من 1.5M د.إ',
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=1200',
      type: 'فيلات النخبة',
      beds: '3-5 غرف',
    },
    {
      id: '3',
      title: 'برج ديفانس من شوبارد',
      location: 'الخليج التجاري، دبي',
      price: 'بدءاً من 4.2M د.إ',
      image: 'https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?auto=format&fit=crop&q=80&w=1200',
      type: 'بنتهاوس فاخر',
      beds: '4-6 غرف',
    },
    {
      id: '4',
      title: 'داماك كازا',
      location: 'الصفوح، دبي',
      price: 'بدءاً من 2.4M د.إ',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
      type: 'شقق معلقة',
      beds: '1-4 غرف',
    },
  ],
  en: [
    {
      id: '1',
      title: 'DAMAC Bay by Cavalli',
      location: 'Dubai Harbour, Dubai',
      price: 'Starts from AED 2.9M',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
      type: 'Sea View Apartments',
      beds: '1-3 BR',
    },
    {
      id: '2',
      title: 'Sapphire at DAMAC Hills',
      location: 'DAMAC Hills, Dubai',
      price: 'Starts from AED 1.5M',
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=1200',
      type: 'Elite Villas',
      beds: '3-5 BR',
    },
    {
      id: '3',
      title: 'De Grisogono Tower',
      location: 'Business Bay, Dubai',
      price: 'Starts from AED 4.2M',
      image: 'https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?auto=format&fit=crop&q=80&w=1200',
      type: 'Luxury Penthouse',
      beds: '4-6 BR',
    },
    {
      id: '4',
      title: 'DAMAC Casa',
      location: 'Al Sufouh, Dubai',
      price: 'Starts from AED 2.4M',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
      type: 'Sky Apartments',
      beds: '1-4 BR',
    },
  ]
};

export const AMENITIES: Record<string, Amenity[]> = {
  ar: [
    { id: '1', name: 'خدمة كونسيرج 24/7', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600' },
    { id: '2', name: 'صالات سينما خاصة', image: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?auto=format&fit=crop&q=80&w=600' },
    { id: '3', name: 'منتجعات صحية ملكية', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecee?auto=format&fit=crop&q=80&w=600' },
    { id: '4', name: 'مهابط مروحية', image: 'https://images.unsplash.com/photo-1502462041640-b3d7e50d0662?auto=format&fit=crop&q=80&w=600' },
  ],
  en: [
    { id: '1', name: '24/7 Concierge Service', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600' },
    { id: '2', name: 'Private Cinema Halls', image: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?auto=format&fit=crop&q=80&w=600' },
    { id: '3', name: 'Royal Spa Resorts', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecee?auto=format&fit=crop&q=80&w=600' },
    { id: '4', name: 'Private Helipads', image: 'https://images.unsplash.com/photo-1502462041640-b3d7e50d0662?auto=format&fit=crop&q=80&w=600' },
  ]
};

export const COMMUNITY_DETAILS: Record<string, Record<string, { title: string; content: React.ReactNode }>> = {
  ar: {
    'داماك هيلز': {
      title: 'مجتمع داماك هيلز الحصري',
      content: (
        <div className="space-y-6">
          <img src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=1200" className="w-full h-64 object-cover border border-[#c5a059]/20" alt="DAMAC Hills" />
          <p className="text-white/80 leading-loose">يعد داماك هيلز مجتمعاً متكاملاً وراقياً يمتد على مساحة 42 مليون قدم مربعة، ويضم مجموعة من العقارات الفاخرة التي تحيط بنادي ترامب إنترناشيونال غولف كلوب دبي.</p>
          <ul className="grid grid-cols-2 gap-4 text-[#c5a059] text-sm font-bold">
            <li>• نادي ترامب للغولف</li>
            <li>• بحيرات اصطناعية</li>
            <li>• مدارس دولية</li>
            <li>• حدائق ترفيهية</li>
          </ul>
        </div>
      )
    },
    'داماك لاجونز': {
      title: 'داماك لاجونز: العيش المستوحى من البحر المتوسط',
      content: (
        <div className="space-y-6">
          <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200" className="w-full h-64 object-cover border border-[#c5a059]/20" alt="DAMAC Lagoons" />
          <p className="text-white/80 leading-loose">اكتشف داماك لاجونز، حيث تلتقي الفخامة بالماء. يتكون هذا المجتمع من 8 مدن مستوحاة من أجمل وجهات البحر الأبيض المتوسط.</p>
        </div>
      )
    },
    'وسط مدينة دبي': {
      title: 'وسط مدينة دبي: نبض الفخامة العالمي',
      content: (
        <div className="space-y-6">
          <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200" className="w-full h-64 object-cover border border-[#c5a059]/20" alt="Downtown Dubai" />
          <p className="text-white/80 leading-loose">يقع في قلب دبي وأكثر مناطقها شهرة عالمياً، حيث يتواجد برج خليفة ودبي مول.</p>
        </div>
      )
    },
    'داماك كازا': {
      title: 'داماك كازا: الرفاهية المائية في الصفوح',
      content: (
        <div className="space-y-6">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200" className="w-full h-64 object-cover border border-[#c5a059]/20" alt="DAMAC Casa" />
          <p className="text-white/80 leading-loose">برج سكني فريد مستوحى من حركة الأمواج والماء، يقع في منطقة الصفوح.</p>
        </div>
      )
    }
  },
  en: {
    'DAMAC Hills': {
      title: 'DAMAC Hills Exclusive Community',
      content: (
        <div className="space-y-6">
          <img src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=1200" className="w-full h-64 object-cover border border-[#c5a059]/20" alt="DAMAC Hills" />
          <p className="text-white/80 leading-loose">DAMAC Hills is a well-established self-contained community comprising villas, apartments, and a hotel.</p>
          <ul className="grid grid-cols-2 gap-4 text-[#c5a059] text-sm font-bold">
            <li>• Trump Golf Club</li>
            <li>• Artificial Lagoons</li>
            <li>• International Schools</li>
            <li>• Parks & Leisure</li>
          </ul>
        </div>
      )
    },
    'DAMAC Lagoons': {
      title: 'DAMAC Lagoons: Mediterranean Living',
      content: (
        <div className="space-y-6">
          <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200" className="w-full h-64 object-cover border border-[#c5a059]/20" alt="DAMAC Lagoons" />
          <p className="text-white/80 leading-loose">Discover DAMAC Lagoons, where luxury meets water in 8 Mediterranean-inspired cities.</p>
        </div>
      )
    }
  }
};

export const RENTAL_LINKS = {
  ar: 'https://www.damacproperties.com/ar/rent/',
  en: 'https://www.damacproperties.com/en/rent/'
};

export const RESOURCE_DETAILS: Record<string, Record<string, { title: string; content: React.ReactNode }>> = {
  ar: {
    'investor-relations': {
      title: 'علاقات المستثمرين',
      content: (
        <div className="space-y-6 text-right">
          <h4 className="text-xl font-bold text-white">التقارير المالية والشفافية</h4>
          <p className="text-white/70">تلتزم داماك العقارية بأعلى معايير الحوكمة والشفافية.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="p-4 border border-white/10 hover:border-[#c5a059] transition-all text-right group">
              <div className="text-[#c5a059] font-bold">التقرير السنوي 2023</div>
              <div className="text-[10px] text-white/40">تحميل ملف PDF</div>
            </button>
          </div>
        </div>
      )
    },
    'newsroom': {
      title: 'غرفة الأخبار',
      content: (
        <div className="space-y-6 text-right">
          <div className="space-y-4">
            <div className="p-4 border-l-2 border-[#c5a059] bg-white/5">
              <div className="text-[10px] text-[#c5a059] font-bold mb-1">مارس 2024</div>
              <h5 className="font-bold">داماك تطلق مشروعها الأحدث بالتعاون مع كافالي في لندن</h5>
            </div>
          </div>
        </div>
      )
    }
  },
  en: {
    'investor-relations': {
      title: 'Investor Relations',
      content: (
        <div className="space-y-6">
          <h4 className="text-xl font-bold text-white">Financial Reporting & Transparency</h4>
          <p className="text-white/70">DAMAC Properties is committed to high standards of corporate governance.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="p-4 border border-white/10 hover:border-[#c5a059] transition-all text-left group">
              <div className="text-[#c5a059] font-bold">Annual Report 2023</div>
              <div className="text-[10px] text-white/40">Download PDF</div>
            </button>
          </div>
        </div>
      )
    }
  }
};
