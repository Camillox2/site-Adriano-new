import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, Instagram } from 'lucide-react';
import { SITE, WHATSAPP_DEFAULT } from '../utils/constants';
import CountUp from './CountUp';
import Reveal from './Reveal';

const TESTIMONIALS = [
  {
    name: 'Maria S.',
    treatment: 'HIFU',
    text: 'Resultado incrível! O Dr. Adriano é muito profissional e o procedimento HIFU superou minhas expectativas. Minha pele ficou mais firme e jovem de forma natural.',
    location: 'São Lourenço do Oeste',
  },
  {
    name: 'João S.',
    treatment: 'Implantes',
    text: 'Excelente profissional! Meu implante ficou perfeito e o atendimento foi excepcional. Voltei a sorrir com confiança.',
    location: 'Realeza',
  },
  {
    name: 'Ana C.',
    treatment: 'Harmonização Orofacial',
    text: 'Resultado natural e lindo! O Dr. Adriano tem um olhar clínico incrível. Me sinto muito mais confiante.',
    location: 'Ampére',
  },
  {
    name: 'Carlos R.',
    treatment: 'Ortodontia',
    text: 'Tratamento ortodôntico perfeito! O Dr. Adriano foi muito atencioso durante todo o processo. Meu sorriso ficou exatamente como eu sonhava.',
    location: 'São Lourenço do Oeste',
  },
  {
    name: 'Fernanda L.',
    treatment: 'Ozonioterapia',
    text: 'A ozonioterapia me ajudou muito na recuperação pós-cirúrgica. Técnica inovadora e o Dr. Adriano sempre explicando tudo com detalhes.',
    location: 'Realeza',
  },
  {
    name: 'Roberto O.',
    treatment: 'HIFU',
    text: 'Incrível como o HIFU pode rejuvenescer sem cirurgia! Resultado surpreendente e natural.',
    location: 'Ampére',
  },
];

const STATS = [
  { end: 30, suffix: '+', label: 'anos de experiência' },
  { end: 4, suffix: '', label: 'cidades atendidas' },
  { value: 'Milhares', label: 'de pacientes atendidos' },
  { end: 5, suffix: '', label: 'especialidades integradas' },
];

const TestimonialsSection = () => {
  const [index, setIndex] = useState(0);

  const next = useCallback(
    () => setIndex((prev) => (prev + 1) % TESTIMONIALS.length),
    []
  );
  const prev = () =>
    setIndex((current) => (current === 0 ? TESTIMONIALS.length - 1 : current - 1));

  useEffect(() => {
    const interval = setInterval(next, 7000);
    return () => clearInterval(interval);
  }, [next]);

  const current = TESTIMONIALS[index];

  return (
    <section id="depoimentos" className="section bg-slate-900 relative overflow-hidden">
      <div
        className="absolute -top-32 -right-32 w-96 h-96 bg-primary-600/15 rounded-full blur-3xl"
        aria-hidden="true"
      ></div>
      <div
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl"
        aria-hidden="true"
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Números que geram confiança */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-14 md:mb-20">
          {STATS.map(({ value, end, suffix, label }, index) => (
            <Reveal key={label} delay={index * 100}>
              <div className="text-center bg-white/5 border border-white/10 rounded-2xl py-6 px-4 h-full">
                {value ? (
                  <span className="block text-3xl md:text-4xl font-bold text-emerald-400">
                    {value}
                  </span>
                ) : (
                  <CountUp
                    end={end}
                    suffix={suffix}
                    className="block text-3xl md:text-4xl font-bold text-emerald-400"
                  />
                )}
                <span className="block text-sm text-slate-300 mt-1.5">{label}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-emerald-300 px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold tracking-widest uppercase">
            Depoimentos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-5 leading-tight">
            Quem confia, recomenda
          </h2>
        </div>

        {/* Depoimento em destaque */}
        <div className="relative max-w-3xl mx-auto">
          <figure className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-center overflow-hidden">
            <Quote className="text-primary-200 mx-auto mb-5" size={44} aria-hidden="true" />
            <div className="flex justify-center gap-1 mb-6" role="img" aria-label="Avaliação 5 de 5 estrelas">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-amber-400 fill-current" size={20} aria-hidden="true" />
              ))}
            </div>
            {/* key força o crossfade a cada troca de depoimento */}
            <div key={index} className="animate-fade-in">
              <blockquote className="text-lg md:text-xl text-slate-700 leading-relaxed">
                “{current.text}”
              </blockquote>
              <figcaption className="mt-7 pt-6 border-t border-slate-100">
                <span className="block font-bold text-slate-900">{current.name}</span>
                <span className="block text-sm text-slate-500 mt-1">
                  {current.treatment} • {current.location}
                </span>
              </figcaption>
            </div>
          </figure>

          <button
            onClick={prev}
            className="absolute left-0 sm:-left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 rounded-full p-4 shadow-lg transition-all hover:scale-105"
            aria-label="Depoimento anterior"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 sm:-right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 rounded-full p-4 shadow-lg transition-all hover:scale-105"
            aria-label="Próximo depoimento"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Depoimentos">
          {TESTIMONIALS.map((testimonial, i) => (
            <button
              key={testimonial.name}
              onClick={() => setIndex(i)}
              role="tab"
              aria-selected={i === index}
              aria-label={`Depoimento de ${testimonial.name}`}
              className="p-2 outline-none group"
            >
              <div
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === index ? 'bg-emerald-400 w-8' : 'bg-white/30 w-2.5 group-hover:bg-white/50'
                }`}
              />
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <p className="text-slate-300 mb-6 max-w-xl mx-auto">
            Veja mais resultados e o dia a dia do consultório no Instagram — ou
            agende agora a sua avaliação.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <a
              href={WHATSAPP_DEFAULT}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Quero agendar minha avaliação
            </a>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-light"
            >
              <Instagram size={18} aria-hidden="true" />
              Ver no Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
