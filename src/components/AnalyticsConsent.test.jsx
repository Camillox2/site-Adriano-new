import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AnalyticsConsent from './AnalyticsConsent';
import { rememberGoogleClickId, trackLead } from '../utils/leadTracking';

jest.mock('../utils/leadTracking', () => ({
  rememberGoogleClickId: jest.fn(),
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
    trackLead.mockClear();
  });

  afterEach(() => {
    document.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]').forEach((script) => script.remove());
    window.localStorage.clear();
  });

  it('registra um lead quando o visitante clica em um link do WhatsApp', () => {
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
    expect(trackLead).toHaveBeenCalledTimes(1);
    expect(trackLead).toHaveBeenCalledWith(expect.objectContaining({
      method: 'whatsapp_click',
      service: 'Agendar no WhatsApp',
    }));

    expect(trackLead.mock.calls[0][0].onComplete).toEqual(expect.any(Function));

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
    expect(window.dataLayer.some((event) => event[0] === 'event' && event[1] === 'directions_click')).toBe(true);

    unmount();
  });
});
