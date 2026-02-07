
import React, { useState } from 'react';

interface Props {
  onOpenModal: (title: string, content: React.ReactNode) => void;
  lang: 'ar' | 'en';
}

const LeadForm: React.FC<Props> = ({ onOpenModal, lang }) => {
  const isRtl = lang === 'ar';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: isRtl ? 'برج ديفانس' : 'Defense Tower',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      onOpenModal(
        isRtl ? 'تنبيه' : 'Alert', 
        <p className={`text-center p-8 text-white/80 ${isRtl ? 'text-right' : 'text-left'}`}>
          {isRtl ? 'يرجى تعبئة الحقول الأساسية (الاسم ورقم الجوال) لنتمكن من التواصل معك.' : 'Please fill in the basic fields (Name and Mobile) so we can contact you.'}
        </p>
      );
      return;
    }
    
    setStatus('loading');
    
    setTimeout(() => {
      setStatus('success');
      onOpenModal(
        isRtl ? 'طلب ناجح' : 'Request Successful', 
        (
        <div className="text-center p-8 space-y-4">
          <div className="text-5xl mb-4">✨</div>
          <h3 className="text-2xl font-bold text-[#c5a059]">{isRtl ? 'شكراً لثقتكم بداماك' : 'Thank you for trusting DAMAC'}</h3>
          <p className="text-white/60">
            {isRtl 
              ? `لقد استلمنا طلبكم بخصوص ${formData.project}. سيقوم أحد مستشارينا العقاريين بالتواصل معكم خلال 24 ساعة عمل.`
              : `We have received your request regarding ${formData.project}. One of our property consultants will contact you within 24 working hours.`
            }
          </p>
        </div>
      ));
      setStatus('idle');
      setFormData({ name: '', email: '', phone: '', project: isRtl ? 'برج ديفانس' : 'Defense Tower' });
    }, 1500);
  };

  return (
    <div id="contact" className={`bg-[#1a0f0a] p-10 rounded-none border border-[#c5a059]/10 luxury-shadow relative overflow-hidden transition-all duration-500 ${isRtl ? 'text-right' : 'text-left'}`}>
      <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent opacity-30"></div>
      
      <div className="mb-8">
        <h3 className="text-2xl font-luxury font-bold mb-2 text-[#c5a059]">{isRtl ? 'امتلك مستقبلك العقاري' : 'Own Your Future'}</h3>
        <p className="text-xs text-white/40 tracking-wider">
          {isRtl ? 'سجل اهتمامك للحصول على دعوة حصرية لجولاتنا الحية.' : 'Register your interest to receive exclusive invitations to our live tours.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="group">
          <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 group-focus-within:text-[#c5a059] transition-colors">{isRtl ? 'الاسم الكامل' : 'Full Name'}</label>
          <input 
            type="text" 
            required
            className={`w-full bg-[#0d0805] border border-white/5 px-5 py-4 text-white focus:border-[#c5a059] outline-none transition-all duration-300 font-light placeholder:text-white/5 ${isRtl ? 'text-right' : 'text-left'}`}
            placeholder={isRtl ? "أدخل اسمك بالكامل" : "Enter your full name"}
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div className="group">
          <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 group-focus-within:text-[#c5a059] transition-colors">{isRtl ? 'رقم الجوال' : 'Mobile Number'}</label>
          <div className={`flex gap-2 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="w-24 bg-[#0d0805] border border-white/5 flex items-center justify-center text-[10px] text-white/40 tracking-tighter">
               UAE/KSA
            </div>
             <input 
              type="tel" 
              required
              className={`flex-1 bg-[#0d0805] border border-white/5 px-5 py-4 text-white focus:border-[#c5a059] outline-none transition-all duration-300 font-light placeholder:text-white/5 ${isRtl ? 'text-right' : 'text-left'}`}
              placeholder="50XXXXXXX"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
        </div>

        <div className="group">
          <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 group-focus-within:text-[#c5a059] transition-colors">{isRtl ? 'المشروع المستهدف' : 'Target Project'}</label>
          <select 
            className={`w-full bg-[#0d0805] border border-white/5 px-5 py-4 text-white focus:border-[#c5a059] outline-none transition-all duration-300 font-light appearance-none ${isRtl ? 'text-right' : 'text-left'}`}
            value={formData.project}
            onChange={(e) => setFormData({...formData, project: e.target.value})}
          >
            {isRtl ? (
              <>
                <option>داماك باي باي كافالي</option>
                <option>سافاير في داماك هيلز</option>
                <option>برج ديفانس من شوبارد</option>
                <option>داماك كازا</option>
              </>
            ) : (
              <>
                <option>DAMAC Bay by Cavalli</option>
                <option>Sapphire at DAMAC Hills</option>
                <option>De Grisogono Tower</option>
                <option>DAMAC Casa</option>
              </>
            )}
          </select>
        </div>

        <button 
          disabled={status === 'loading'}
          className="w-full gold-gradient text-black py-5 rounded-none font-bold text-sm tracking-widest uppercase hover:shadow-[0_0_30px_rgba(197,160,89,0.3)] transition-all flex items-center justify-center gap-3 btn-trigger"
        >
          {status === 'loading' ? (
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>{isRtl ? 'إرسال الطلب الآن' : 'Submit Request Now'}</>
          )}
        </button>
      </form>
    </div>
  );
};

export default LeadForm;
