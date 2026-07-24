import React, { useState } from 'react';
import { Send, Phone, User, MapPin, Sparkles } from 'lucide-react';
import { whatsapp } from '../utils/constants';

const SERVICES_OPTIONS = [
  'HIFU — Ultrassom Microfocado',
  'Lipo de Papada sem Cortes',
  'Aluguel de Equipamento HIFU (B2B)',
  'Odontologia Estética / Lentes',
  'Implantes Dentários',
  'Ortodontia / Alinhadores',
  'Harmonização Orofacial',
  'DTM e Dor Orofacial',
  'Ozonioterapia',
];

const DesktopWhatsAppForm = ({ defaultService = '', defaultCity = '', title = 'Agende no WhatsApp' }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(defaultService || SERVICES_OPTIONS[0]);
  const [city, setCity] = useState(defaultCity || 'São Lourenço do Oeste');

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `Olá, Dr. Adriano! Meu nome é ${name || 'Cliente'}${city ? ` (${city})` : ''}. Gostaria de agendar/informações sobre: *${service}*. Meu contato: ${phone || 'não informado'}.`;
    window.open(whatsapp(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="hidden lg:block bg-slate-900/90 border border-slate-800 backdrop-blur-xl rounded-3xl p-6 shadow-2xl shadow-emerald-950/20 text-left">
      <div className="flex items-center gap-2 mb-2 text-emerald-400 font-semibold text-sm">
        <Sparkles size={16} />
        <span>Atendimento Direto e Rápido</span>
      </div>
      <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
      <p className="text-xs text-slate-300 mb-5">
        Preencha abaixo para abrir o WhatsApp com seu atendimento já priorizado.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Seu Nome</label>
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              required
              placeholder="Ex: Dra. Juliana ou Marcos"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Seu WhatsApp</label>
            <div className="relative">
              <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="tel"
                required
                placeholder="(00) 90000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Sua Cidade</label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Ex: Chapecó"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Assunto de Interesse</label>
          <select
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
