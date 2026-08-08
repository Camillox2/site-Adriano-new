import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  FlaskConical,
  Heart,
  MapPin,
  ExternalLink,
  Phone,
  Smile,
  Stethoscope,
  Syringe,
} from 'lucide-react';
import { LOCATIONS, whatsapp } from '../utils/constants';

const SERVICES = [
  {
    id: 'ortodontia',
    path: '/ortodontia',
    Icon: Smile,
    color: 'text-primary-700 bg-primary-50',
    title: 'Ortodontia',
    description: 'Alinhamento dos dentes e correção da mordida com planejamento individual.',
  },
  {
    id: 'implantes',
    path: '/implantes-dentarios',
    Icon: Heart,
    color: 'text-secondary-700 bg-secondary-50',
    title: 'Implantes Dentários',
    description: 'Reabilitação de dentes ausentes com foco em função, estabilidade e estética.',
  },
  {
    id: 'harmonizacao',
    path: '/harmonizacao-orofacial',
    Icon: Syringe,
    color: 'text-primary-700 bg-primary-50',
    title: 'Harmonização Orofacial',
    description: 'Equilíbrio facial e suavização dos sinais do tempo com resultados naturais.',
  },
  {
    id: 'odontologia-estetica',
    path: '/odontologia-estetica',
    Icon: Smile,
    color: 'text-secondary-700 bg-secondary-50',
    title: 'Odontologia Estética',
    description: 'Planejamento para cuidar da estética, saúde e função do seu sorriso.',
  },
  {
    id: 'dtm',
    path: '/dtm-dor-orofacial',
    Icon: Stethoscope,
    color: 'text-primary-700 bg-primary-50',
    title: 'DTM e Dor Orofacial',
    description: 'Avaliação de dores na face, mandíbula, articulação e sinais de bruxismo.',
  },
  {
    id: 'ozonioterapia',
    path: '/ozonioterapia',
    Icon: FlaskConical,
    color: 'text-secondary-700 bg-secondary-50',
    title: 'Ozonioterapia',
    description: 'Terapia complementar utilizada em protocolos odontológicos selecionados.',
  },
];

const ServicesSection = () => (
  <section id="servicos" className="section bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <span className="section-eyebrow">Especialidades</span>
        <h2 className="section-title mt-5">
          Cuidado completo para o seu{' '}
          <span className="text-primary-700">sorriso e a sua autoestima</span>
        </h2>
        <p className="section-subtitle mt-5">
          Da saúde bucal à estética facial: tratamentos com tecnologia atual,
          planejamento individual e atendimento humanizado.
        </p>
      </div>

      <div className="mb-12 rounded-3xl border border-slate-100 bg-slate-50 p-6 shadow-sm md:mb-16 md:p-10">
        <div className="text-center mb-8">
          <h3 className="flex items-center justify-center gap-3 text-2xl font-bold text-slate-900 md:text-3xl">
            <MapPin className="text-primary-700" size={28} aria-hidden="true" />
            Atendimento Regional
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-slate-600">
            Consultório de referência em São Lourenço do Oeste — com fácil deslocamento e agendamento otimizado para pacientes de Chapecó, Pato Branco e todo o Sudoeste do PR / Oeste de SC.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {LOCATIONS.map((location) => (
            <div key={location.city} className={`rounded-2xl border p-5 transition-all duration-300 hover:shadow-lg ${location.main ? 'border-primary-200 bg-primary-50/60' : 'border-slate-100 bg-white'}`}>
              {location.main && <span className="mb-3 inline-block rounded-full bg-primary-700 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">Consultório principal</span>}
              <h4 className="font-bold text-slate-900">{location.city}</h4>
              {!location.main && <p className="mb-1 text-sm text-slate-600">{location.type}</p>}
              <p className="mb-4 text-sm text-slate-700">{location.address}</p>
              <div className="flex flex-wrap gap-3 text-sm font-semibold">
                <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-primary-700 hover:underline"><ExternalLink size={14} aria-hidden="true" />Ver no mapa</a>
                <a href={whatsapp(`Olá! Gostaria de agendar uma consulta em ${location.city}.`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-secondary-700 hover:underline">Agendar</a>
                {location.pageUrl && <Link to={location.pageUrl} className="inline-flex items-center gap-1.5 text-emerald-700 hover:underline"><ArrowRight size={14} aria-hidden="true" />Saiba mais</Link>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {SERVICES.map((service) => (
          <article key={service.id} className="card card-lift p-7 flex flex-col">
            <span className={`inline-flex self-start p-3.5 rounded-2xl mb-5 ${service.color}`}>
              <service.Icon size={28} aria-hidden="true" />
            </span>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed flex-1">
              {service.description}
            </p>
            <Link
              to={service.path}
              className="inline-flex items-center gap-2 text-primary-700 font-semibold mt-6 hover:gap-3.5 transition-all text-sm md:text-base"
              aria-label={`Saiba mais sobre ${service.title}`}
            >
              Saiba mais
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="/servicos" className="btn-primary w-full sm:w-auto">
          Ver todos os serviços
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <a
          href={whatsapp('Olá, Dr. Adriano! Gostaria de uma orientação sobre os tratamentos.')}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-dark w-full sm:w-auto"
        >
          <Phone size={18} aria-hidden="true" />
          Falar com o Dr. Adriano
        </a>
      </div>
    </div>
  </section>
);

export default ServicesSection;
