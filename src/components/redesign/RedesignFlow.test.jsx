import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TreatmentExplorer from './TreatmentExplorer';
import AppointmentForm from './AppointmentForm';
import DentalHero from './DentalHero';
import { trackLead, formatClickIdForWhatsApp } from '../../utils/leadTracking';

jest.mock('../../utils/leadTracking', () => ({ trackLead: jest.fn(), formatClickIdForWhatsApp: jest.fn(() => '') }));

test('choosing a specialty updates the illustration, description and destination together', () => {
  render(<MemoryRouter><TreatmentExplorer /></MemoryRouter>);
  fireEvent.click(screen.getByRole('button', { name: '03 Implantes dentários' }));
  expect(screen.getByRole('button', { name: '03 Implantes dentários' })).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('button', { name: '01 Odontologia estética' })).toHaveAttribute('aria-expanded', 'false');
  expect(screen.getByRole('img', { name: 'Ilustração vetorial de implante dentário' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Conhecer o tratamento' })).toHaveAttribute('href', '/implantes-dentarios');
  fireEvent.click(screen.getByRole('button', { name: '04 Harmonização orofacial' }));
  expect(screen.getByRole('link', { name: 'Conhecer o tratamento' })).toHaveAttribute('href', '/harmonizacao-orofacial');
  expect(screen.getByRole('img', { name: /Perfil facial/ })).toBeInTheDocument();
});

test('the appointment flow uses the chosen service and trimmed fields in the real WhatsApp destination', () => {
  const open = jest.spyOn(window, 'open').mockImplementation(() => null);
  formatClickIdForWhatsApp.mockReturnValue('\nCódigo do anúncio (gclid): QA-ID');
  render(<AppointmentForm />);
  fireEvent.change(screen.getByLabelText('Seu nome'), { target: { value: '  Pessoa Teste  ' } });
  fireEvent.change(screen.getByLabelText('Sua cidade'), { target: { value: '  Pato Branco  ' } });
  fireEvent.change(screen.getByLabelText('Seu interesse'), { target: { value: 'Implantes dentários' } });
  fireEvent.click(screen.getByRole('button', { name: 'Continuar no WhatsApp' }));
  const destination = new URL(open.mock.calls[0][0]);
  expect(destination.hostname).toBe('wa.me');
  expect(destination.pathname).toBe('/5549998362864');
  expect(destination.searchParams.get('text')).toContain('Meu nome é Pessoa Teste e sou de Pato Branco');
  expect(destination.searchParams.get('text')).toContain('Implantes dentários');
  expect(destination.searchParams.get('text')).toContain('QA-ID');
  expect(trackLead).toHaveBeenCalledWith({ method: 'form_whatsapp', service: 'Implantes dentários', city: 'Pato Branco' });
  open.mockRestore();
});

test('manual chair control stays usable when automatic movement is disabled, and scene tabs support the keyboard', () => {
  render(<DentalHero paused reducedMotion onToggleMotion={jest.fn()} />);
  expect(screen.getByRole('button', { name: 'Movimento reduzido ativo no dispositivo' })).toBeDisabled();
  fireEvent.change(screen.getByRole('slider', { name: 'Posição da cadeira' }), { target: { value: '100' } });
  expect(document.querySelector('.rd-chair-back').style.transform).toBe('rotate(38deg)');
  fireEvent.keyDown(screen.getByRole('tab', { name: 'Conforto' }), { key: 'ArrowRight' });
  expect(screen.getByRole('tab', { name: 'Sorriso' })).toHaveAttribute('aria-selected', 'true');
  expect(screen.getByRole('img', { name: 'Ilustração vetorial de dente saudável' })).toBeInTheDocument();
  fireEvent.keyDown(screen.getByRole('tab', { name: 'Sorriso' }), { key: 'End' });
  expect(screen.getByRole('tab', { name: 'Estética' })).toHaveFocus();
  expect(screen.getByRole('img', { name: /Perfil facial/ })).toBeInTheDocument();
});
