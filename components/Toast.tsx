
import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] animate-bounce">
      <div className="bg-[#c5a059] text-black px-8 py-4 rounded-none font-bold shadow-2xl flex items-center gap-3 border border-white/20">
        <span className="text-xl">✨</span>
        <span className="text-sm tracking-wide">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
