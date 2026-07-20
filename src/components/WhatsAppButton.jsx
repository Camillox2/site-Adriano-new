import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { WHATSAPP_DEFAULT, WHATSAPP_RENTAL } from '../utils/constants';

// Ícone oficial do WhatsApp (SVG inline)
const WhatsAppIcon = ({ size = 28 }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.59 4.46 1.71 6.4L3.2 28.8l6.59-1.67a12.74 12.74 0 0 0 6.21 1.6h.01c7.06 0 12.79-5.74 12.79-12.8 0-3.42-1.33-6.63-3.75-9.05a12.72 12.72 0 0 0-9.05-3.68zm0 23.47h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.02 1.02 1.07-3.86-.25-.4a10.6 10.6 0 0 1-1.62-5.72c0-5.87 4.78-10.65 10.66-10.65 2.85 0 5.52 1.11 7.53 3.12a10.59 10.59 0 0 1 3.12 7.54c0 5.87-4.78 10.66-10.65 10.66zm5.84-7.98c-.32-.16-1.9-.94-2.19-1.04-.29-.11-.51-.16-.72.16-.21.32-.83 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66 0 1.57 1.14 3.09 1.3 3.3.16.21 2.25 3.43 5.45 4.81.76.33 1.36.53 1.82.67.77.24 1.46.21 2.01.13.61-.09 1.9-.78 2.16-1.53.27-.75.27-1.39.19-1.53-.08-.13-.29-.21-.61-.37z" />
  </svg>
);

const WhatsAppButton = ({ href, label }) => {
  const [visible, setVisible] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const { pathname } = useLocation();
  const isRentalPage = pathname === '/alugar_hifu';
  const resolvedHref = href || (isRentalPage ? WHATSAPP_RENTAL : WHATSAPP_DEFAULT);
  const resolvedLabel = label || (isRentalPage ? 'Consulte a locação pelo WhatsApp' : 'Dúvidas? Fale com a gente!');

  // Aparece após um pequeno scroll; balão de convite alguns segundos depois
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const labelTimer = setTimeout(() => setShowLabel(true), 6000);
    const hideTimer = setTimeout(() => setShowLabel(false), 16000);

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(labelTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 md:bottom-7 md:right-7 z-50 flex items-center gap-3 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      {showLabel && (
        <span className="hidden sm:block bg-white text-slate-800 text-sm font-medium px-4 py-2.5 rounded-2xl rounded-br-sm shadow-xl border border-slate-100 animate-fade-in">
          {resolvedLabel}
        </span>
      )}
      <a
        href={resolvedHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar no WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full shadow-2xl shadow-emerald-600/40 hover:scale-110 active:scale-95 transition-transform duration-300"
      >
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25"
          aria-hidden="true"
        ></span>
        <WhatsAppIcon size={30} />
      </a>
    </div>
  );
};

export default WhatsAppButton;
