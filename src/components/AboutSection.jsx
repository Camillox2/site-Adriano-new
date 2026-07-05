import React from 'react';
import { Award, GraduationCap, Star, MapPin, ExternalLink, Instagram } from 'lucide-react';
import { images } from '../assets';
import { SITE, LOCATIONS, whatsapp } from '../utils/constants';

const ACHIEVEMENTS = [
  {
    Icon: GraduationCap,
    title: 'Formação sólida',
    description: 'Graduado pela UFSC, com especialização em Ortodontia',
  },
  {
    Icon: Award,
    title: 'Certificação em HIFU',
    description: 'Capacitado em Ultrassom Microfocado e Harmonização Orofacial',
  },
  {
    Icon: Star,
    title: '15+ anos de experiência',
    description: 'Milhares de pacientes atendidos com cuidado e dedicação',
  },
];

const AboutSection = () => (
  <section id="sobre" className="section bg-slate-50">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <span className="section-eyebrow">Conheça o profissional</span>
        <h2 className="section-title mt-5">
          Dr. <span className="text-primary-700">Adriano Camillo</span>
        </h2>
        <p className="section-subtitle mt-5">
          Cirurgião-dentista dedicado a unir ciência, tecnologia e um
          atendimento verdadeiramente humano.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-center mb-14 md:mb-20">
        {/* Foto */}
        <div className="lg:col-span-2 flex justify-center">
          <div className="relative">
            <div
              className="absolute -inset-3 bg-gradient-to-tr from-primary-200 to-emerald-200 rounded-[2rem] blur-xl opacity-70"
              aria-hidden="true"
            ></div>
            <img
              src={images.paidois}
              alt="Dr. Adriano Camillo, cirurgião-dentista, em atendimento no consultório"
              loading="lazy"
              width="440"
              height="520"
              className="relative w-72 h-80 sm:w-80 sm:h-96 lg:w-[24rem] lg:h-[28rem] object-cover object-top rounded-[2rem] shadow-2xl"
            />
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-2xl px-6 py-3 text-center border border-slate-100 whitespace-nowrap">
              <span className="block font-bold text-slate-900">Dr. Adriano Camillo</span>
              <span className="block text-sm text-slate-500">Cirurgião-Dentista</span>
            </div>
          </div>
        </div>

        {/* Texto */}
        <div className="lg:col-span-3 space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
            Experiência que gera confiança
          </h3>
          <p className="text-slate-600 leading-relaxed md:text-lg">
            Com mais de 15 anos de atuação, o Dr. Adriano Camillo é referência
            regional em tratamentos odontológicos e estéticos avançados.
            Graduado pela Universidade Federal de Santa Catarina (UFSC), possui
            especialização em Ortodontia e certificações em Harmonização
            Orofacial e HIFU.
          </p>
          <p className="text-slate-600 leading-relaxed md:text-lg">
            Sua abordagem combina técnicas consolidadas com as tecnologias mais
            atuais — sempre com um princípio inegociável: cada paciente é único
            e merece um plano de tratamento feito sob medida.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {ACHIEVEMENTS.map(({ Icon, title, description }) => (
              <div key={title} className="card p-5 text-center sm:text-left">
                <span className="inline-flex p-2.5 rounded-xl bg-primary-50 text-primary-700 mb-3">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h4 className="font-bold text-slate-900 text-sm md:text-base leading-snug">
                  {title}
                </h4>
                <p className="text-slate-600 text-xs md:text-sm mt-1.5 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>

          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary-700 font-semibold hover:gap-3 transition-all"
          >
            <Instagram size={18} aria-hidden="true" />
            Acompanhe o dia a dia no Instagram
          </a>
        </div>
      </div>

      {/* Locais de atendimento */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-10">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center justify-center gap-3">
            <MapPin className="text-primary-700" size={28} aria-hidden="true" />
            Locais de atendimento
          </h3>
          <p className="text-slate-600 mt-2">
            Consultório em São Lourenço do Oeste e atendimento agendado na região
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {LOCATIONS.map((location) => (
            <div
              key={location.city}
              className={`rounded-2xl p-5 border transition-all duration-300 hover:shadow-lg ${
                location.main
                  ? 'bg-primary-50/60 border-primary-200'
                  : 'bg-slate-50 border-slate-100'
              }`}
            >
              {location.main && (
                <span className="inline-block bg-primary-700 text-white text-[11px] font-bold tracking-wide uppercase px-3 py-1 rounded-full mb-3">
                  Consultório principal
                </span>
              )}
              <h4 className="font-bold text-slate-900">{location.city}</h4>
              {!location.main && (
                <p className="text-sm text-slate-500 mb-2">{location.type}</p>
              )}
              <p className="text-sm text-slate-700 mb-4">{location.address}</p>
              <div className="flex flex-wrap gap-3 text-sm font-semibold">
                <a
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary-700 hover:underline"
                >
                  <ExternalLink size={14} aria-hidden="true" />
                  Ver no mapa
                </a>
                <a
                  href={whatsapp(`Olá! Gostaria de agendar uma consulta em ${location.city}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-secondary-700 hover:underline"
                >
                  Agendar
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
