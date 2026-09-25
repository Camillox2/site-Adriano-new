import { useEffect, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ADS_PHONE_CLICK_SEND_TO,
  ADS_WHATSAPP_CLICK_SEND_TO,
  GA_MEASUREMENT_ID,
  GOOGLE_ADS_ID,
  rememberGoogleClickId,
  trackAdsClickConversion,
} from '../utils/leadTracking';
import { hydration, isPrerendering } from '../utils/prerender';

const CONSENT_KEY = 'dr-adriano-analytics-consent';
const TRACKED_WHATSAPP_SELECTOR = 'a[href^="https://wa.me/"]';
const TRACKED_MAP_SELECTOR = 'a[href*="google.com/maps"], a[href*="maps.google.com"]';

const getLinkContext = (link) => {
  const section = link.closest('section, article, header, footer, main');
  const sectionText = section?.innerText || '';
  const cityMatch = sectionText.match(/(?:S[aã]o Louren[cç]o do Oeste|Pato Branco|Chapec[oó]|Realeza|Amp[eé]re|Curitiba)/i);

  return {
    label: link.getAttribute('aria-label') || link.textContent?.trim() || 'Contato pelo site',
    city: cityMatch?.[0] || '',
  };
};

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
    analytics_storage: 'denied',
  });
  // Keeps ad-click identifiers (gclid/wbraid/gbraid) in internal links while
  // consent is denied, so Ads can attribute conversions without cookies.
  window.gtag('set', 'url_passthrough', true);
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
  window.gtag('config', GOOGLE_ADS_ID);

  const script = document.createElement('script');
  script.async = true;
  // A single Google tag configures both destinations. Starting with the Ads
  // ID lets Google Ads detect the base tag while GA4 remains configured above.
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
  document.head.appendChild(script);
};

const AnalyticsConsent = () => {
  const [consent, setConsent] = useState(() => window.localStorage.getItem(CONSENT_KEY));
  // Ao hidratar HTML pré-renderizado (que não contém o banner), o primeiro
  // render precisa bater com o HTML; o banner entra logo em seguida, antes da pintura.
  const [mounted, setMounted] = useState(() => !hydration.pending);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Captura do pré-render no build: nenhum script de analytics/consentimento.
    if (isPrerendering()) return undefined;
    // Advanced Consent Mode: load after hydration with every storage category
    // denied. A refusal therefore does not allow Ads/Analytics cookies.
    loadAnalytics();
    const trackContactClick = (event) => {
      if (!(event.target instanceof Element)) return;

      const link = event.target.closest('a');
      if (!link || !window.gtag) return;

      if (link.matches('a[href^="tel:"]')) {
        window.gtag('event', 'phone_click', {
          link_label: link.getAttribute('aria-label') || link.textContent.trim(),
          link_url: link.href,
          page_location: window.location.href,
        });
        trackAdsClickConversion(ADS_PHONE_CLICK_SEND_TO);
        return;
      }

      if (link.matches(TRACKED_MAP_SELECTOR)) {
        const { label, city } = getLinkContext(link);
        window.gtag('event', 'directions_click', {
          link_label: label,
          link_url: link.href,
          city,
          page_location: window.location.href,
        });
        return;
      }

      if (!link.matches(TRACKED_WHATSAPP_SELECTOR)) return;

      // LGPD: consent is only granted by the "Aceitar" button in the banner.
      // A WhatsApp click never changes the consent state.

      const needsNavigationGuard = !link.target || link.target === '_self';
      let navigated = false;
      const continueNavigation = () => {
        if (navigated || !needsNavigationGuard) return;
        navigated = true;
        window.location.assign(link.href);
      };

      if (needsNavigationGuard && !event.metaKey && !event.ctrlKey && !event.shiftKey && event.button === 0) {
        event.preventDefault();
      }

      window.gtag('event', 'whatsapp_click', {
        send_to: GA_MEASUREMENT_ID,
        method: 'WhatsApp',
        link_label: link.dataset.leadService || link.getAttribute('aria-label') || link.textContent.trim(),
        link_url: link.href,
        page_location: window.location.href,
        transport_type: 'beacon',
      });
      trackAdsClickConversion(ADS_WHATSAPP_CLICK_SEND_TO);

      if (needsNavigationGuard && !navigated) {
        window.setTimeout(continueNavigation, 500);
      }
    };

    document.addEventListener('click', trackContactClick);
    return () => {
      document.removeEventListener('click', trackContactClick);
    };
  }, []);

  useEffect(() => {
    if (consent !== 'granted' || isPrerendering()) return;

    window.gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'denied',
      analytics_storage: 'granted',
    });
    rememberGoogleClickId();
  }, [consent]);

  const setChoice = (choice) => {
    window.localStorage.setItem(CONSENT_KEY, choice);
    setConsent(choice);
  };

  if (consent || !mounted || isPrerendering()) return null;

  return (
    <aside
      aria-label="Aviso de cookies"
      className="fixed inset-x-4 bottom-4 md:inset-x-auto md:right-6 md:bottom-6 z-[60] max-w-md rounded-2xl bg-slate-950 text-white shadow-2xl p-4 md:p-5"
    >
      <h2 className="font-semibold text-base">Este site utiliza cookies</h2>
      <p className="text-sm leading-relaxed text-slate-300 mt-1">
        Usamos cookies para melhorar sua experiência e entender como o site é usado. Você pode aceitar ou recusar.{' '}
        <Link className="text-emerald-300 hover:text-emerald-200 underline" to="/politica-de-privacidade">
          Política de privacidade
        </Link>
      </p>
      <div className="flex flex-row gap-3 mt-4">
        <button type="button" className="btn-primary !py-2.5 text-sm flex-1" onClick={() => setChoice('granted')}>
          Aceitar
        </button>
        <button type="button" className="btn-outline-light !py-2.5 text-sm flex-1" onClick={() => setChoice('denied')}>
          Recusar
        </button>
      </div>
    </aside>
  );
};

export default AnalyticsConsent;
