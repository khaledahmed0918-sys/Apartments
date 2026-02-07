
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#1a0f0a] border border-[#c5a059]/30 luxury-shadow overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
          <h3 className="text-2xl md:text-3xl font-luxury font-bold text-[#c5a059]">{title}</h3>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-[#c5a059] transition-colors border border-white/10 hover:border-[#c5a059]/50 btn-trigger"
          >
            ✕
          </button>
        </div>
        
        {/* Content */}
        <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar text-right">
          {content}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 bg-black/20 flex justify-end">
          <button 
            onClick={onClose} 
            className="gold-gradient text-black px-8 py-3 font-bold text-xs uppercase tracking-widest btn-trigger"
          >
            إغلاق النافذة
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
