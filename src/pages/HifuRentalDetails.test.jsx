import { render, screen } from '@testing-library/react';
import HifuRentalDetails from './HifuRentalDetails';
import ErrorBoundary from '../components/ErrorBoundary';
import { SERVICE_PAGES } from '../data/servicePages';

jest.mock('../components/DesktopWhatsAppForm', () => () => null);
jest.mock('../components/SkinDiagram', () => () => null);

describe('HifuRentalDetails', () => {
  beforeAll(() => {
    window.matchMedia = window.matchMedia || ((query) => ({
      matches: true,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
    window.IntersectionObserver = window.IntersectionObserver || class {
      observe() {}
      disconnect() {}
    };
  });

  it('renderiza a página de locação mesmo sem paragraphs nos dados', () => {
    const page = SERVICE_PAGES['aluguel-de-hifu'];
    expect(page.paragraphs).toBeUndefined();

    render(<HifuRentalDetails data={page} />);

    expect(screen.getByText(page.heading)).toBeTruthy();
    expect(screen.getByText('Suporte completo no seu HIFU Day')).toBeTruthy();
  });

  it('não quebra quando todas as listas estão ausentes', () => {
    render(<HifuRentalDetails data={{ heading: 'Locação de HIFU', cityName: 'Chapecó' }} />);

    expect(screen.getByText('Locação de HIFU')).toBeTruthy();
  });
});

describe('ErrorBoundary', () => {
  it('mostra mensagem com link do WhatsApp em vez de página em branco', () => {
    const Broken = () => {
      throw new Error('falha');
    };
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Broken />
      </ErrorBoundary>
    );

    const link = screen.getByRole('link', { name: 'Falar no WhatsApp' });
    expect(link.getAttribute('href')).toMatch(/^https:\/\/wa\.me\/5549998362864/);
    spy.mockRestore();
  });
});
