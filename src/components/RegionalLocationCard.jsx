import React from 'react';
import { MapPin, Navigation, ShieldCheck, Truck, PhoneCall, Sparkles } from 'lucide-react';
import { whatsapp } from '../utils/constants';
import Reveal from './Reveal';

const REGIONAL_INFO = {
  chapeco: {
    cityName: 'Chapecó - SC',
    distance: 'Nós vamos até você em Chapecó',
    route: 'Atendimento Domiciliar ou em Clínica Parceira',
    tagline: 'Levamos excelência em HIFU e Harmonização Facial diretamente para você em Chapecó. Mais conforto, zero viagens.',
    highlights: [
      {
        icon: Truck,
        title: 'Nós Vamos Até Você',
        description: 'Chega de pegar estrada. Agendamos o procedimento na sua cidade para que você economize tempo e ganhe conforto.',
      },
      {
        icon: Sparkles,
        title: 'HIFU & Harmonização',
        description: 'Toxina botulínica, preenchimentos e lifting sem cortes com HIFU realizados no conforto da sua região.',
      },
      {
        icon: ShieldCheck,
        title: 'Acompanhamento Pós-Procedimento',
        description: 'O Dr. Adriano oferece todo o suporte pós-procedimento via WhatsApp e agendamento de retornos na sua cidade.',
      },
    ],
    whatsappMsg: 'Olá, Dr. Adriano! Sou de Chapecó e gostaria de agendar um atendimento na minha cidade.',
  },
  'pato-branco': {
    cityName: 'Pato Branco - PR',
    distance: 'Nós vamos até você em Pato Branco',
    route: 'Atendimento Programado na sua Cidade',
    tagline: 'O melhor da odontologia estética, HIFU e Harmonização Facial agora disponíveis diretamente em Pato Branco.',
    highlights: [
      {
        icon: Truck,
        title: 'Atendimento sem Deslocamento',
        description: 'Levamos nossa estrutura de atendimento até Pato Branco. Seu procedimento de estética e HIFU perto de você.',
      },
      {
        icon: Sparkles,
        title: 'Procedimentos Premium',
        description: 'Lifting facial com ultrassom microfocado e procedimentos de harmonização orofacial sem precisar viajar.',
      },
      {
        icon: ShieldCheck,
        title: 'Locação & Clínicas Parceiras',
        description: 'Alugamos equipamentos para profissionais de Pato Branco e realizamos os nossos atendimentos em ambientes seguros.',
      },
    ],
    whatsappMsg: 'Olá, Dr. Adriano! Sou de Pato Branco e gostaria de agendar uma avaliação na minha cidade.',
  },
  curitiba: {
    cityName: 'Curitiba & Região Metropolitana',
    distance: 'Logística Premium & Atendimento',
    route: 'Batel, Bigorrilho, Água Verde, S. J. dos Pinhais e mais',
    tagline: 'Locação de equipamentos HIFU para profissionais e atendimento estético avançado na capital.',
    highlights: [
      {
        icon: Truck,
        title: 'Locação e Entrega em Curitiba',
        description: 'Alugamos e entregamos o equipamento HIFU higienizado e testado diretamente na sua clínica ou consultório.',
      },
      {
        icon: Sparkles,
        title: 'Atendimento Estético na Capital',
        description: 'Realizamos harmonização facial e tratamentos com HIFU com hora marcada para pacientes de Curitiba e região.',
      },
      {
        icon: ShieldCheck,
        title: 'Treinamento Operacional',
        description: 'Para locatários, fornecemos suporte clínico constante e orientação operacional de alta performance.',
      },
    ],
    whatsappMsg: 'Olá, Dr. Adriano! Falo de Curitiba e gostaria de saber mais sobre HIFU e Harmonização.',
  },
};

const RegionalLocationCard = ({ citySlug }) => {
  const info = REGIONAL_INFO[citySlug];

  if (!info) return null;

  return (
    <section className="section bg-slate-900 text-white relative overflow-hidden my-10 rounded-3xl border border-slate-800 shadow-2xl">
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-600/15 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-primary-600/15 rounded-full blur-3xl" aria-hidden="true" />

      <div className="container mx-auto px-6 py-8 relative z-10">
        <Reveal className="max-w-3xl mx-auto text-center mb-10">
          <span className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider mb-4">
            <MapPin size={16} />
            Atendimento Regional Dedicado
          </span>
          <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight">
            Informações Especiais para Pacientes de <span className="text-emerald-400">{info.cityName}</span>
          </h3>
          <p className="text-slate-300 text-sm md:text-base mt-3 leading-relaxed">
            {info.tagline}
          </p>
        </Reveal>

        {/* Card de Rota e Distância */}
        <Reveal delay={100} className="mb-10">
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-left">
              <div className="p-3.5 bg-emerald-500/20 text-emerald-400 rounded-2xl shrink-0">
                <Navigation size={28} />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block">
                  Rota Recomendada
                </span>
                <h4 className="text-base md:text-lg font-bold text-white">{info.route}</h4>
                <span className="text-xs md:text-sm text-emerald-300 mt-1 block">
                  📍 {info.distance}
                </span>
              </div>
            </div>

            <a
              href={whatsapp(info.whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs md:text-sm shrink-0 whitespace-nowrap"
            >
              <PhoneCall size={16} />
              Agendar para {info.cityName.split(' ')[0]}
            </a>
          </div>
        </Reveal>

        {/* Três Diferenciais para a Cidade */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {info.highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={150 + idx * 80}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full flex flex-col justify-between">
                  <div>
                    <span className="inline-flex p-3 rounded-xl bg-emerald-500/10 text-emerald-400 mb-4">
                      <Icon size={24} />
                    </span>
                    <h5 className="font-bold text-white text-base mb-2">{item.title}</h5>
                    <p className="text-slate-300 text-xs leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Transparência E-E-A-T (Qualidade e Conformidade com Diretrizes do Google) */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2.5 text-left">
            <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
            <span>
              <strong className="text-slate-200">Transparência & Conformidade Google E-E-A-T:</strong> O consultório físico do Dr. Adriano Camillo (CRO-SC) está sediado na Rua Coronel Bertaso, 1243 - Sala 206, São Lourenço do Oeste - SC. Oferecemos atendimento com hora marcada e logística de apoio para moradores de {info.cityName}.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegionalLocationCard;
