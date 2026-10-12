import React, { useState } from 'react';
import { ArrowRight, MapPin, Phone, Clock } from 'lucide-react';
import { SITE, ADDRESS, whatsapp } from '../../utils/constants';
import { formatClickIdForWhatsApp, trackLead } from '../../utils/leadTracking';

const INTERESTS = ['Quero uma avaliação', 'Odontologia estética', 'Ortodontia', 'Implantes dentários', 'Harmonização orofacial', 'HIFU — Ultrassom Microfocado', 'DTM e dor orofacial', 'Ozonioterapia'];

export default function AppointmentForm() {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [interest, setInterest] = useState(INTERESTS[0]);
  const submit = event => {
    event.preventDefault();
    if (!name.trim()) { document.getElementById('rd-name')?.focus(); return; }
    trackLead({ method: 'form_whatsapp', service: interest, city: city.trim() });
    const message = `Olá, Dr. Adriano! Meu nome é ${name.trim()}${city.trim() ? ` e sou de ${city.trim()}` : ''}. Vim pelo site e gostaria de conversar sobre: ${interest}.${formatClickIdForWhatsApp()}`;
    window.open(whatsapp(message), '_blank', 'noopener,noreferrer');
  };
  return <section id="contato" className="rd-contact rd-section"><div className="rd-wrap rd-contact-layout">
    <div className="rd-contact-copy"><h2>Seu próximo passo<br /><span>pode ser uma conversa.</span></h2><p>Fale com a equipe e encontre um horário para sua avaliação.</p><ul><li><Phone size={21} /><a href={SITE.phoneTel}>{SITE.phone}</a></li><li><MapPin size={22} /><a href={ADDRESS.mapsUrl} target="_blank" rel="noreferrer">São Lourenço do Oeste · SC</a></li><li><Clock size={22} /><span>Segunda a sexta · 8h30 às 19h</span></li></ul><svg className="rd-contact-flourish" viewBox="0 0 200 200" aria-hidden="true"><path d="M71 44Q92 31 110 45Q148 23 158 55Q163 78 146 111Q136 165 122 161Q116 113 104 111Q91 112 79 162Q61 177 57 117Q32 64 71 44Z" fill="none" stroke="currentColor" strokeWidth="1.2" /><path d="M25 155Q86 224 173 134M44 154Q1 113 18 86Q55 97 44 154M157 115Q185 66 175 38Q138 55 157 115" fill="#c9e3d6" stroke="currentColor" strokeWidth=".7" /></svg></div>
    <div className="rd-appointment"><h3>Vamos conversar?</h3><form onSubmit={submit}><label htmlFor="rd-name">Seu nome</label><input id="rd-name" type="text" autoComplete="given-name" placeholder="Digite seu nome" required maxLength="80" pattern=".*\S.*" value={name} onChange={event=>setName(event.target.value)} /><label htmlFor="rd-city">Sua cidade</label><input id="rd-city" type="text" autoComplete="address-level2" placeholder="Digite sua cidade" maxLength="100" value={city} onChange={event=>setCity(event.target.value)} /><label htmlFor="rd-interest">Seu interesse</label><select id="rd-interest" value={interest} onChange={event=>setInterest(event.target.value)}>{INTERESTS.map(value=><option key={value}>{value}</option>)}</select><button className="rd-button" type="submit">Continuar no WhatsApp <ArrowRight size={21} /></button><small>Você será direcionado ao WhatsApp da equipe.</small></form></div>
  </div></section>;
}
