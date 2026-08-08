import React, { useState } from 'react';
import { Send, User, MapPin, Sparkles } from 'lucide-react';
import { whatsapp } from '../utils/constants';
import { formatClickIdForWhatsApp, trackLead } from '../utils/leadTracking';

const SERVICES_OPTIONS = [
  'HIFU — Ultrassom Microfocado',
  'Lipo de Papada sem Cortes',
  'Odontologia Estética / Lentes',
  'Implantes Dentários',
  'Ortodontia / Alinhadores',
  'Harmonização Orofacial',
  'DTM e Dor Orofacial',
  'Ozonioterapia',
];

const DesktopWhatsAppForm = ({ defaultService = '', defaultCity = '', title = 'Agende no WhatsApp' }) => {
  const [name, setName] = useState('');
  const [service, setService] = useState(defaultService || SERVICES_OPTIONS[0]);
  const [city, setCity] = useState(defaultCity || 'São Lourenço do Oeste');

  const handleSubmit = (e) => {
    e.preventDefault();
    trackLead({ method: 'form_whatsapp', service, city });
    const message = `Olá, Dr. Adriano! Meu nome é ${name || 'Cliente'}${city ? ` e sou de ${city}` : ''}. Gostaria de agendar uma avaliação sobre: *${service}*.${formatClickIdForWhatsApp()}`;
    window.open(whatsapp(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="hidden lg:block bg-slate-900/90 border border-slate-800 backdrop-blur-xl rounded-3xl p-6 shadow-2xl shadow-emerald-950/20 text-left">
      <div className="flex items-center gap-2 mb-2 text-emerald-400 font-semibold text-sm">
        <Sparkles size={16} />
        <span>Atendimento Direto e Rápido</span>
      </div>
      <h2 className="text-xl font-bold text-white mb-1">{title}</h2>
      <p className="text-xs text-slate-300 mb-5">
        Preencha abaixo para abrir o WhatsApp com seu atendimento já priorizado.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="desktop-form-name" className="block text-xs font-medium text-slate-300 mb-1">
            Seu Nome
          </label>
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="desktop-form-name"
              type="text"
              required
              aria-label="Seu Nome"
              placeholder="Ex: Maria"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label htmlFor="desktop-form-city" className="block text-xs font-medium text-slate-300 mb-1">
            Sua Cidade
          </label>
          <div className="relative">
            <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="desktop-form-city"
              type="text"
              aria-label="Sua Cidade"
              placeholder="Ex: Chapecó"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label htmlFor="desktop-form-service" className="block text-xs font-medium text-slate-300 mb-1">
            Assunto de Interesse
          </label>
          <select
            id="desktop-form-service"
            aria-label="Assunto de Interesse"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
          >
            {SERVICES_OPTIONS.map((opt) => (
              <option key={opt} value={opt} className="bg-slate-900 text-white">
                {opt}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full btn-primary !py-3 text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50"
        >
          <Send size={18} />
          Enviar Mensagem no WhatsApp
        </button>
      </form>
    </div>
  );
};

export default DesktopWhatsAppForm;
