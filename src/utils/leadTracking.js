const LEAD_CLICK_ID_KEY = 'dr-adriano-google-click-id';
export const GA_MEASUREMENT_ID = 'G-ZFM9X87FLS';
export const GOOGLE_ADS_ID = 'AW-18349275000';
const GOOGLE_ADS_LEAD_SEND_TO = `${GOOGLE_ADS_ID}/DnpUCP2Jgd4cEPjuzq1E`;

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

export const trackLead = ({ method, service = 'Avaliação', city = '' } = {}) => {
  if (typeof window.gtag !== 'function' || method !== 'form_whatsapp') return;

  const leadPayload = {
    method,
    service,
    city,
  };

  window.gtag('event', 'form_whatsapp_submit', {
    ...leadPayload,
    send_to: GA_MEASUREMENT_ID,
  });

  window.gtag('event', 'generate_lead', {
    ...leadPayload,
    send_to: GA_MEASUREMENT_ID,
    transport_type: 'beacon',
  });

  const conversionPayload = {
    send_to: GOOGLE_ADS_LEAD_SEND_TO,
    value: 1.0,
    currency: 'BRL',
    transport_type: 'beacon',
  };

  window.gtag('event', 'conversion', conversionPayload);
};

export const formatClickIdForWhatsApp = () => {
  const clickId = getLeadTrackingContext();
  return clickId ? `\nCódigo do anúncio (${clickId.type}): ${clickId.value}` : '';
};
