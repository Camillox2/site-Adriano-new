import { GA_MEASUREMENT_ID, trackAdsClickConversion, trackLead } from './leadTracking';

describe('trackLead', () => {
  beforeEach(() => {
    window.gtag = jest.fn();
  });

  afterEach(() => {
    delete window.gtag;
  });

  it('envia o evento específico do formulário e o único lead principal', () => {
    trackLead({ method: 'form_whatsapp', service: 'HIFU', city: 'São Lourenço do Oeste' });

    expect(window.gtag).toHaveBeenNthCalledWith(1, 'event', 'form_whatsapp_submit', {
      method: 'form_whatsapp',
      service: 'HIFU',
      city: 'São Lourenço do Oeste',
      send_to: GA_MEASUREMENT_ID,
    });
    expect(window.gtag).toHaveBeenNthCalledWith(2, 'event', 'generate_lead', expect.objectContaining({
      send_to: GA_MEASUREMENT_ID,
    }));
    expect(window.gtag).toHaveBeenNthCalledWith(3, 'event', 'conversion', expect.objectContaining({
      send_to: 'AW-18349275000/DnpUCP2Jgd4cEPjuzq1E',
    }));
  });

  it('não envia conversão do Ads para clique simples no WhatsApp', () => {
    trackLead({ method: 'whatsapp_click' });

    expect(window.gtag).not.toHaveBeenCalled();
  });
});

describe('trackAdsClickConversion', () => {
  beforeEach(() => {
    window.gtag = jest.fn();
  });

  afterEach(() => {
    delete window.gtag;
  });

  it('não envia nada enquanto o rótulo de conversão estiver vazio', () => {
    trackAdsClickConversion('');

    expect(window.gtag).not.toHaveBeenCalled();
  });

  it('envia a conversão secundária quando o rótulo estiver configurado', () => {
    trackAdsClickConversion('AW-18349275000/TESTE');

    expect(window.gtag).toHaveBeenCalledWith('event', 'conversion', expect.objectContaining({
      send_to: 'AW-18349275000/TESTE',
    }));
  });
});
