import React, { useEffect, useRef } from 'react';
import { Phone, Instagram, ShieldCheck, MapPin, Star } from 'lucide-react';
import { images, videos } from '../assets';
import { SITE, WHATSAPP_DEFAULT } from '../utils/constants';
import CountUp from './CountUp';
import DesktopWhatsAppForm from './DesktopWhatsAppForm';

const Hero = () => {
  const backgroundVideoRef = useRef(null);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => {
      const video = backgroundVideoRef.current;
      if (!video) return;
      if (motionQuery.matches) video.pause();
      else video.play().catch(() => {});
    };

    syncMotion();
    motionQuery.addEventListener?.('change', syncMotion);
    return () => motionQuery.removeEventListener?.('change', syncMotion);
  }, []);

  const scrollToHifu = () => {
    document.getElementById('hifu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-slate-900"
    >
      {/* Fundo: foto estática otimizada no mobile e vídeo de alta qualidade no desktop */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src={images.consultorio1}
          alt=""
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="w-full h-full object-cover block md:hidden opacity-40"
        />
        <video
          ref={backgroundVideoRef}
          className="w-full h-full object-cover hidden md:block"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={images.consultorio1}
          src={videos.hifuDois}
          tabIndex={-1}
          aria-hidden="true"
        >
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-900/60"></div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/90 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10 pt-28 pb-16 lg:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Texto */}
          <div className="text-white space-y-6 text-center lg:text-left animate-fade-in-up">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-emerald-300">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-soft" aria-hidden="true"></span>
              Dentista em São Lourenço do Oeste • Atendimento para Pato Branco e Região
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              Rejuvenesça e transforme
              <span className="text-emerald-400"> seu sorriso</span>
              <br className="hidden sm:block" /> sem cirurgia
            </h1>

            <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Referência regional em HIFU (Ultrassom Microfocado), Ortodontia, Implantes e Harmonização
              Orofacial com o Dr. Adriano Camillo — tecnologia avançada e mais de 30 anos de experiência para pacientes de todo o Oeste Catarinense e Sudoeste do PR.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href={WHATSAPP_DEFAULT}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base md:text-lg flex items-center justify-center gap-2 shadow-emerald-500/20"
              >
                <Phone size={19} aria-hidden="true" />
                Agendar no WhatsApp
              </a>
              <button
                onClick={scrollToHifu}
                className="btn-outline-light text-base md:text-lg hover:bg-slate-900 border-white/20"
              >
                Conhecer o HIFU
              </button>
            </div>

            <p className="text-sm text-slate-200 flex items-center justify-center lg:justify-start gap-2 font-medium">
              <ShieldCheck size={16} className="text-emerald-400 shrink-0" aria-hidden="true" />
              Resposta rápida pelo WhatsApp • Avaliação sem compromisso
            </p>

            <div className="w-full max-w-sm mx-auto lg:hidden">
              <DesktopWhatsAppForm
                title="Agende sua avaliação"
                className="block"
                formId="mobile-whatsapp-form"
              />
            </div>

            {/* Instagram discreto */}
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-slate-200 hover:text-white transition-colors text-sm font-medium"
            >
              <Instagram size={16} aria-hidden="true" />
              {SITE.instagramHandle}
            </a>
          </div>

          {/* Foto do Dr. Adriano + Formulário Desktop */}
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-center lg:justify-end animate-fade-in-right">
            <div className="w-full max-w-sm hidden lg:block">
              <DesktopWhatsAppForm title="Agendar Avaliação Rápida" />
            </div>

            <div className="relative">
              <div
                className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/30 to-primary-500/30 rounded-[2rem] blur-2xl"
                aria-hidden="true"
              ></div>
              <img
                src={images.drAdriano}
                alt="Dr. Adriano Camillo em seu consultório"
                width="420"
                height="354"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="relative w-60 sm:w-72 lg:w-[18rem] xl:w-[20rem] h-auto object-contain rounded-[2rem] shadow-2xl ring-1 ring-white/20"
              />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 lg:left-auto lg:-translate-x-0 lg:-right-4 bg-white text-slate-900 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 w-max max-w-[90vw]">
                <ShieldCheck className="text-emerald-600 shrink-0" size={24} aria-hidden="true" />
                <span className="text-sm font-semibold leading-tight whitespace-nowrap">
                  Atuação com HIFU
                  <span className="block text-xs font-normal text-slate-700 whitespace-nowrap">
                    e Harmonização Orofacial
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de confiança com números animados */}
        <div className="mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto lg:mx-0">
          <div className="flex items-center justify-center lg:justify-start gap-4 bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl px-6 py-4">
            <Star className="text-emerald-400 shrink-0" size={28} aria-hidden="true" />
            <span>
              <CountUp end={30} suffix="+" className="block text-2xl font-bold text-white" />
              <span className="block text-sm text-slate-200">anos de experiência</span>
            </span>
          </div>
          <div className="flex items-center justify-center lg:justify-start gap-4 bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl px-6 py-4">
            <MapPin className="text-emerald-400 shrink-0" size={28} aria-hidden="true" />
            <span>
              <span className="block text-lg font-bold text-white leading-tight">
                São Lourenço do Oeste
              </span>
              <span className="block text-xs text-slate-200">
                Atendimento para Pato Branco e Região
              </span>
            </span>
          </div>
          <div className="flex items-center justify-center lg:justify-start gap-4 bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl px-6 py-4">
            <ShieldCheck className="text-emerald-400 shrink-0" size={28} aria-hidden="true" />
            <span>
              <CountUp end={1} suffix=":1" className="block text-2xl font-bold text-white" />
              <span className="block text-sm text-slate-300">planejamento individual</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
