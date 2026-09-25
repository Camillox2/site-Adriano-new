import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WhatsAppButton from './WhatsAppButton';

const renderAt = (path = '/') => render(
  <MemoryRouter initialEntries={[path]}>
    <WhatsAppButton />
  </MemoryRouter>
);

describe('WhatsAppButton (botão flutuante)', () => {
  it('renderiza um link do WhatsApp com mensagem pré-preenchida e rótulo acessível', () => {
    renderAt('/');

    const link = screen.getByRole('link', { name: 'Falar no WhatsApp' });
    const href = link.getAttribute('href');

    expect(href.startsWith('https://wa.me/5549998362864')).toBe(true);
    expect(link.matches('a[href^="https://wa.me/"]')).toBe(true);
    expect(new URL(href).searchParams.get('text')).toBe(
      'Olá! Vim pelo site e gostaria de agendar uma avaliação.'
    );
    expect(link.getAttribute('aria-label')).toBe('Falar no WhatsApp');
    expect(link.getAttribute('data-lead-service')).toBe('Botão flutuante');
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    expect(link.className).toContain('fixed');
    expect(link.className).not.toMatch(/(^|\s)hidden(\s|$)/);
  });

  it('continua visível em páginas internas', () => {
    renderAt('/ortodontia');
    expect(
      screen.getByRole('link', { name: 'Falar no WhatsApp' }).getAttribute('href')
    ).toMatch(/^https:\/\/wa\.me\/5549998362864/);
  });

  it('sobe acima do aviso de cookies enquanto ele estiver aberto', async () => {
    const banner = document.createElement('aside');
    banner.setAttribute('aria-label', 'Aviso de cookies');
    banner.getBoundingClientRect = () => ({ top: 600, height: 200, left: 0, right: 0, bottom: 800, width: 300 });
    document.body.appendChild(banner);

    renderAt('/');
    const link = screen.getByRole('link', { name: 'Falar no WhatsApp' });
    expect(link.style.bottom).toBe(`${window.innerHeight - 600 + 12}px`);

    await act(async () => {
      banner.remove();
      await new Promise((resolve) => setTimeout(resolve, 50));
    });
    expect(link.style.bottom).toBe('');
  });
});
