import { trackLead } from './leadTracking';

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
    });
    expect(window.gtag).toHaveBeenNthCalledWith(2, 'event', 'generate_lead', expect.any(Object));
    expect(window.gtag).toHaveBeenNthCalledWith(3, 'event', 'conversion', expect.objectContaining({
      send_to: 'AW-18349275000/DnpUCP2Jgd4cEPjuzq1E',
    }));
  });
});
