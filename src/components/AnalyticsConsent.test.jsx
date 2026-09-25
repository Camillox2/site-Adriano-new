import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AnalyticsConsent from './AnalyticsConsent';
import { rememberGoogleClickId, trackAdsClickConversion, trackLead } from '../utils/leadTracking';

jest.mock('../utils/leadTracking', () => ({
  GA_MEASUREMENT_ID: 'G-ZFM9X87FLS',
  GOOGLE_ADS_ID: 'AW-18349275000',
  ADS_WHATSAPP_CLICK_SEND_TO: 'AW-18349275000/TSg8CKzz-4QdEPjuzq1E',
  ADS_PHONE_CLICK_SEND_TO: 'AW-18349275000/-MjrCK_z-4QdEPjuzq1E',
  rememberGoogleClickId: jest.fn(),
  trackAdsClickConversion: jest.fn(),
  trackLead: jest.fn(),
}));

describe('AnalyticsConsent', () => {
  beforeEach(() => {
    window.localStorage.setItem('dr-adriano-analytics-consent', 'granted');
    delete window.__drAdrianoAnalyticsLoaded;
    delete window.__drAdrianoTrackLead;
    delete window.gtag;
    window.dataLayer = [];
    rememberGoogleClickId.mockClear();
    trackAdsClickConversion.mockClear();
    trackLead.mockClear();
  });

  afterEach(() => {
    document.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]').forEach((script) => script.remove());
    window.localStorage.clear();
  });

  it('registra o clique no WhatsApp apenas no Analytics, sem conversão do Ads', () => {
    const { unmount } = render(
      <MemoryRouter>
        <AnalyticsConsent />
        <a href="https://wa.me/5549998362864" aria-label="Agendar no WhatsApp">
          Agendar
        </a>
      </MemoryRouter>
    );

    fireEvent.click(document.querySelector('a[href^="https://wa.me/"]'));

    expect(rememberGoogleClickId).toHaveBeenCalledTimes(1);
    expect(trackLead).not.toHaveBeenCalled();
    expect(window.dataLayer.some((event) => (
      event[0] === 'event'
      && event[1] === 'whatsapp_click'
      && event[2].send_to === 'G-ZFM9X87FLS'
    ))).toBe(true);
    expect(window.dataLayer.some((event) => event[0] === 'event' && event[1] === 'conversion')).toBe(false);

    unmount();
  });

  it('registra telefone e rota somente como eventos auxiliares', () => {
    const { unmount } = render(
      <MemoryRouter>
        <AnalyticsConsent />
        <a href="tel:+5549998362864">Ligar</a>
        <a href="https://maps.google.com/?q=Dr+Adriano">Ver no mapa</a>
      </MemoryRouter>
    );

    fireEvent.click(document.querySelector('a[href^="tel:"]'));
    fireEvent.click(document.querySelector('a[href*="maps.google.com"]'));

    expect(trackLead).not.toHaveBeenCalled();
    expect(window.dataLayer.some((event) => event[0] === 'event' && event[1] === 'phone_click')).toBe(true);
    expect(trackAdsClickConversion).toHaveBeenCalledTimes(1);
    expect(trackAdsClickConversion).toHaveBeenCalledWith('AW-18349275000/-MjrCK_z-4QdEPjuzq1E');
    expect(window.dataLayer.some((event) => event[0] === 'event' && event[1] === 'directions_click')).toBe(true);

    unmount();
  });

  it('mantém a tag em modo negado e envia somente sinais sem cookies quando a medição é recusada', () => {
    window.localStorage.setItem('dr-adriano-analytics-consent', 'denied');

    const { unmount } = render(
      <MemoryRouter>
        <AnalyticsConsent />
        <a href="https://wa.me/5549998362864">Agendar</a>
      </MemoryRouter>
    );

    fireEvent.click(document.querySelector('a[href^="https://wa.me/"]'));

    expect(rememberGoogleClickId).not.toHaveBeenCalled();
    expect(trackLead).not.toHaveBeenCalled();
    expect(window.dataLayer.some((event) => (
      event[0] === 'consent'
      && event[1] === 'default'
      && event[2].ad_storage === 'denied'
      && event[2].analytics_storage === 'denied'
    ))).toBe(true);
    expect(document.querySelector('script[src*="googletagmanager.com/gtag/js?id=AW-18349275000"]')).not.toBeNull();

    unmount();
  });

  it('não concede consentimento automaticamente ao clicar no WhatsApp sem escolha no aviso', () => {
    window.localStorage.removeItem('dr-adriano-analytics-consent');

    const { unmount } = render(
      <MemoryRouter>
        <AnalyticsConsent />
        <a href="https://wa.me/5549998362864">Agendar</a>
      </MemoryRouter>
    );

    fireEvent.click(document.querySelector('a[href^="https://wa.me/"]'));

    expect(window.dataLayer.some((event) => event[0] === 'consent' && event[1] === 'update')).toBe(false);
    expect(rememberGoogleClickId).not.toHaveBeenCalled();
    expect(window.localStorage.getItem('dr-adriano-analytics-consent')).toBeNull();
    expect(window.dataLayer.some((event) => event[0] === 'event' && event[1] === 'whatsapp_click')).toBe(true);
    expect(trackAdsClickConversion).toHaveBeenCalledWith('AW-18349275000/TSg8CKzz-4QdEPjuzq1E');

    unmount();
  });

  it('ativa url_passthrough antes da configuração das tags', () => {
    const { unmount } = render(
      <MemoryRouter>
        <AnalyticsConsent />
      </MemoryRouter>
    );

    const passthroughIndex = window.dataLayer.findIndex((event) => (
      event[0] === 'set' && event[1] === 'url_passthrough' && event[2] === true
    ));
    const firstConfigIndex = window.dataLayer.findIndex((event) => event[0] === 'config');

    expect(passthroughIndex).toBeGreaterThan(-1);
    expect(passthroughIndex).toBeLessThan(firstConfigIndex);

    unmount();
  });

  it('concede consentimento somente ao clicar em Aceitar', () => {
    window.localStorage.removeItem('dr-adriano-analytics-consent');

    const { getByRole, unmount } = render(
      <MemoryRouter>
        <AnalyticsConsent />
      </MemoryRouter>
    );

    expect(window.dataLayer.some((event) => event[0] === 'consent' && event[1] === 'update')).toBe(false);
    fireEvent.click(getByRole('button', { name: 'Aceitar' }));

    expect(window.localStorage.getItem('dr-adriano-analytics-consent')).toBe('granted');
    expect(window.dataLayer.some((event) => (
      event[0] === 'consent'
      && event[1] === 'update'
      && event[2].ad_storage === 'granted'
      && event[2].ad_personalization === 'denied'
    ))).toBe(true);

    unmount();
  });
});
