import React from 'react';
import { Phone, Instagram, ShieldCheck, MapPin, Star } from 'lucide-react';
import { images } from '../assets';
import { SITE, WHATSAPP_DEFAULT } from '../utils/constants';

const TRUST_ITEMS = [
  { icon: Star, value: '15+', label: 'anos de experiência' },
  { icon: MapPin, value: '4', label: 'cidades atendidas' },
  { icon: ShieldCheck, value: '100%', label: 'atendimento personalizado' },
];

const Hero = () => {
  const scrollToHifu = () => {
    document.getElementById('hifu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-slate-900"
    >
      {/* Foto do consultório ao fundo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${images.consultorio1})` }}
        role="img"
        aria-label="Consultório do Dr. Adriano Camillo"
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-slate-900/60"></div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/80 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10 pt-28 pb-16 lg:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Texto */}
          <div className="text-white space-y-6 text-center lg:text-left animate-fade-in-up">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-emerald-300">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-soft" aria-hidden="true"></span>
              Cirurgião-Dentista • São Lourenço do Oeste e região
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              Rejuvenesça e transforme
              <span className="text-emerald-400"> seu sorriso</span>
              <br className="hidden sm:block" /> sem cirurgia
            </h1>

            <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              HIFU (Ultrassom Microfocado), Ortodontia, Implantes e Harmonização
              Orofacial com o Dr. Adriano Camillo — tecnologia de ponta e mais de
              15 anos de experiência cuidando de você.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start pt-2">
              <a
                href={WHATSAPP_DEFAULT}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base md:text-lg"
              >
                <Phone size={20} aria-hidden="true" />
                Agendar Avaliação
              </a>
              <button onClick={scrollToHifu} className="btn-outline-light text-base md:text-lg">
                Conhecer o HIFU
              </button>
            </div>

            <p className="text-sm text-slate-300 flex items-center justify-center lg:justify-start gap-2">
              <ShieldCheck size={16} className="text-emerald-400" aria-hidden="true" />
              Resposta rápida pelo WhatsApp • Avaliação sem compromisso
            </p>

            {/* Instagram discreto */}
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm"
            >
              <Instagram size={16} aria-hidden="true" />
              {SITE.instagramHandle}
            </a>
          </div>

          {/* Foto do Dr. Adriano */}
          <div className="flex justify-center lg:justify-end animate-fade-in-right order-first lg:order-last">
            <div className="relative">
              <div
                className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/30 to-primary-500/30 rounded-[2rem] blur-2xl"
                aria-hidden="true"
              ></div>
              <img
                src={images.drAdriano}
                alt="Dr. Adriano Camillo em seu consultório"
                width="480"
                height="480"
                fetchpriority="high"
                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[26rem] lg:h-[26rem] object-cover rounded-[2rem] shadow-2xl ring-1 ring-white/20"
              />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 lg:left-auto lg:-translate-x-0 lg:-right-4 bg-white text-slate-900 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 w-max max-w-[90vw]">
                <ShieldCheck className="text-emerald-600 shrink-0" size={24} aria-hidden="true" />
                <span className="text-sm font-semibold leading-tight whitespace-nowrap">
                  Especialista em HIFU
                  <span className="block text-xs font-normal text-slate-500 whitespace-nowrap">
                    e Harmonização Orofacial
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de confiança */}
        <div className="mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto lg:mx-0">
          {TRUST_ITEMS.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex items-center justify-center lg:justify-start gap-4 bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl px-6 py-4"
            >
              <Icon className="text-emerald-400 shrink-0" size={28} aria-hidden="true" />
              <span>
                <span className="block text-2xl font-bold text-white">{value}</span>
                <span className="block text-sm text-slate-300">{label}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
