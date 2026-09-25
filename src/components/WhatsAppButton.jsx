import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { WHATSAPP_RENTAL, whatsapp } from '../utils/constants';
import { normalizePath } from '../utils/seoIndexing';

// Mensagem padrão do botão flutuante (todas as páginas)
export const WHATSAPP_FLOAT_MESSAGE = 'Olá! Vim pelo site e gostaria de agendar uma avaliação.';
export const WHATSAPP_FLOAT_HREF = whatsapp(WHATSAPP_FLOAT_MESSAGE);

// Aviso de cookies (AnalyticsConsent) — o botão sobe acima dele enquanto estiver visível
const COOKIE_BANNER_SELECTOR = 'aside[aria-label="Aviso de cookies"]';
const BANNER_GAP_PX = 12;

// Ícone oficial do WhatsApp (SVG inline)
const WhatsAppIcon = ({ size = 28 }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.59 4.46 1.71 6.4L3.2 28.8l6.59-1.67a12.74 12.74 0 0 0 6.21 1.6h.01c7.06 0 12.79-5.74 12.79-12.8 0-3.42-1.33-6.63-3.75-9.05a12.72 12.72 0 0 0-9.05-3.68zm0 23.47h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.02 1.02 1.07-3.86-.25-.4a10.6 10.6 0 0 1-1.62-5.72c0-5.87 4.78-10.65 10.66-10.65 2.85 0 5.52 1.11 7.53 3.12a10.59 10.59 0 0 1 3.12 7.54c0 5.87-4.78 10.66-10.65 10.66zm5.84-7.98c-.32-.16-1.9-.94-2.19-1.04-.29-.11-.51-.16-.72.16-.21.32-.83 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66 0 1.57 1.14 3.09 1.3 3.3.16.21 2.25 3.43 5.45 4.81.76.33 1.36.53 1.82.67.77.24 1.46.21 2.01.13.61-.09 1.9-.78 2.16-1.53.27-.75.27-1.39.19-1.53-.08-.13-.29-.21-.61-.37z" />
  </svg>
);

// Distância (px) do rodapé da janela até o topo do aviso de cookies, ou null se ele não estiver na tela
const measureBannerLift = () => {
  if (typeof document === 'undefined') return null;
  const banner = document.querySelector(COOKIE_BANNER_SELECTOR);
  if (!banner) return null;
  const rect = banner.getBoundingClientRect();
  if (!rect.height) return null;
  return Math.max(0, Math.round(window.innerHeight - rect.top + BANNER_GAP_PX));
};

// Acompanha o aviso de cookies sem alterar o componente de consentimento
const useCookieBannerLift = () => {
  const [lift, setLift] = useState(measureBannerLift);

  useEffect(() => {
    let frame = 0;
    let resizeObserver;
    let observedBanner = null;

    const update = () => {
      frame = 0;
      const banner = document.querySelector(COOKIE_BANNER_SELECTOR);
      if (resizeObserver && banner !== observedBanner) {
        if (observedBanner) resizeObserver.unobserve(observedBanner);
        if (banner) resizeObserver.observe(banner);
        observedBanner = banner;
      }
      setLift(measureBannerLift());
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    if (typeof ResizeObserver !== 'undefined') resizeObserver = new ResizeObserver(schedule);
    const mutationObserver = typeof MutationObserver !== 'undefined'
      ? new MutationObserver(schedule)
      : null;
    mutationObserver?.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('resize', schedule);
    update();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      mutationObserver?.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return lift;
};

const WhatsAppButton = ({ href, label }) => {
  const { pathname } = useLocation();
  const isRentalPage = normalizePath(pathname) === '/alugar_hifu';
  const resolvedHref = href || (isRentalPage ? WHATSAPP_RENTAL : WHATSAPP_FLOAT_HREF);
  const resolvedLabel = label || (isRentalPage ? 'Consulte a locação pelo WhatsApp' : 'Agende pelo WhatsApp');
  const bannerLift = useCookieBannerLift();
  const isLifted = bannerLift !== null;

  return (
    <a
      href={resolvedHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      data-lead-service="Botão flutuante"
      data-whatsapp-float=""
      className="whatsapp-float group fixed z-50 flex items-center gap-3"
      style={isLifted ? { bottom: `${bannerLift}px` } : undefined}
    >
      {/* Rótulo apenas no desktop; some enquanto o aviso de cookies está aberto */}
      {!isLifted && (
        <span
          className="hidden md:block bg-white text-slate-800 text-sm font-semibold px-4 py-2 rounded-full shadow-lg border border-slate-100 whitespace-nowrap"
          aria-hidden="true"
        >
          {resolvedLabel}
        </span>
      )}
      <span
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 group-hover:bg-[#1ebe5b] group-focus-visible:ring-4 group-focus-visible:ring-emerald-300 motion-safe:transition-colors"
      >
        <WhatsAppIcon size={30} />
      </span>
    </a>
  );
};

export default WhatsAppButton;
