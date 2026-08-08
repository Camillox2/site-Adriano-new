const LEAD_CLICK_ID_KEY = 'dr-adriano-google-click-id';
const GOOGLE_ADS_LEAD_SEND_TO = 'AW-18349275000/DnpUCP2Jgd4cEPjuzq1E';

const getSearchClickId = () => {
  const params = new URLSearchParams(window.location.search);
  const type = ['gclid', 'wbraid', 'gbraid'].find((key) => params.get(key));

  return type ? { type, value: params.get(type) } : null;
};

export const rememberGoogleClickId = () => {
  const clickId = getSearchClickId();
  if (!clickId) return null;

  const record = { ...clickId, capturedAt: new Date().toISOString() };
  window.localStorage.setItem(LEAD_CLICK_ID_KEY, JSON.stringify(record));
  return record;
};

export const getLeadTrackingContext = () => {
  const currentClickId = getSearchClickId();
  if (currentClickId) return currentClickId;

  try {
    const stored = window.localStorage.getItem(LEAD_CLICK_ID_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const trackLead = ({ method, service = 'Avaliação', city = '', onComplete } = {}) => {
  if (typeof window.gtag !== 'function') return;

  const leadPayload = {
    method,
    service,
    city,
  };

  if (method === 'form_whatsapp') {
    window.gtag('event', 'form_whatsapp_submit', leadPayload);
  }

  window.gtag('event', 'generate_lead', leadPayload);

  const conversionPayload = {
    send_to: GOOGLE_ADS_LEAD_SEND_TO,
    value: 1.0,
    currency: 'BRL',
  };

  if (typeof onComplete === 'function') {
    conversionPayload.event_callback = onComplete;
    conversionPayload.event_timeout = 800;
  }

  window.gtag('event', 'conversion', conversionPayload);
};

export const formatClickIdForWhatsApp = () => {
  const clickId = getLeadTrackingContext();
  return clickId ? `\nCódigo do anúncio (${clickId.type}): ${clickId.value}` : '';
};
