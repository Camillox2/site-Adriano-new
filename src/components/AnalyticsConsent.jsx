import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const GA_MEASUREMENT_ID = 'G-ZFM9X87FLS';
const CONSENT_KEY = 'dr-adriano-analytics-consent';

const loadAnalytics = () => {
  if (window.__drAdrianoAnalyticsLoaded) return;

  window.__drAdrianoAnalyticsLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'granted',
  });
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
};

const AnalyticsConsent = () => {
  const [consent, setConsent] = useState(() => window.localStorage.getItem(CONSENT_KEY));

  useEffect(() => {
    if (consent !== 'granted') return undefined;

    loadAnalytics();
    const trackWhatsAppClick = (event) => {
      const link = event.target.closest('a[href^="https://wa.me/"]');
      if (!link || !window.gtag) return;

      window.gtag('event', 'generate_lead', {
        method: 'WhatsApp',
        link_url: link.href,
        page_location: window.location.href,
      });
    };

    document.addEventListener('click', trackWhatsAppClick);
    return () => document.removeEventListener('click', trackWhatsAppClick);
  }, [consent]);

  const setChoice = (choice) => {
    window.localStorage.setItem(CONSENT_KEY, choice);
    setConsent(choice);
  };

  if (consent) return null;

  return (
    <aside className="fixed inset-x-4 bottom-4 md:inset-x-auto md:right-6 md:bottom-6 z-[60] max-w-xl rounded-2xl bg-slate-950 text-white shadow-2xl p-5 md:p-6">
      <h2 className="font-bold text-lg">Medição de audiência</h2>
      <p className="text-sm leading-relaxed text-slate-300 mt-2">
        Usamos uma medição opcional para entender páginas acessadas e cliques no WhatsApp.{' '}
        <Link className="text-emerald-300 hover:text-emerald-200 underline" to="/politica-de-privacidade">
          Saiba como funciona.
        </Link>
      </p>
      <div className="flex flex-col sm:flex-row gap-3 mt-5">
        <button type="button" className="btn-primary !py-3 text-sm" onClick={() => setChoice('granted')}>
          Aceitar medição
        </button>
        <button type="button" className="btn-outline-light !py-3 text-sm" onClick={() => setChoice('denied')}>
          Recusar
        </button>
      </div>
    </aside>
  );
};

export default AnalyticsConsent;
