import React from 'react';
import { MapPin, Navigation, Clock, CalendarCheck, ShieldCheck, Truck, PhoneCall, Building2 } from 'lucide-react';
import { whatsapp } from '../utils/constants';
import Reveal from './Reveal';

const REGIONAL_INFO = {
  chapeco: {
    cityName: 'Chapecó - SC',
    distance: 'Aprox. 85 km (~1h 15min)',
    route: 'Acesso rápido pela SC-480 / BR-283 até São Lourenço do Oeste',
    tagline: 'Atendimento odonto-estético de excelência para moradores e pacientes de Chapecó.',
    highlights: [
      {
        icon: CalendarCheck,
        title: 'Sessão Integrada no Mesmo Dia',
        description: 'Organizamos sua avaliação e o procedimento na mesma viagem para otimizar seu tempo e evitar deslocamentos repetidos.',
      },
      {
        icon: Navigation,
        title: 'Rota Direta & Estac. Fácil',
        description: 'Fácil acesso viário vindo de Chapecó com estacionamento e ambiente clínico preparado para seu conforto.',
      },
      {
        icon: ShieldCheck,
        title: 'Acompanhamento Pós via WhatsApp',
        description: 'Suporte remoto contínuo e acompanhamento dedicado do Dr. Adriano durante todo o período de pós-procedimento.',
      },
    ],
    whatsappMsg: 'Olá, Dr. Adriano! Sou de Chapecó e gostaria de agendar uma consulta com atendimento integrado no mesmo dia.',
  },
  'pato-branco': {
    cityName: 'Pato Branco - PR',
    distance: 'Aprox. 50 km (~40 min)',
    route: 'Acesso rápido e asfaltado pela PR-493 / Vitorino',
    tagline: 'Conexão de saúde e estética entre o Sudoeste do Paraná e o Oeste Catarinense.',
    highlights: [
      {
        icon: Clock,
        title: 'Apenas 40 Minutos de Distância',
        description: 'Proximidade geográfica que permite agendar seu atendimento em horários flexíveis e voltar para casa no mesmo dia.',
      },
      {
        icon: CalendarCheck,
        title: 'Horário Reservado Exclusivo',
        description: 'Atendimento rigorosamente pontual, sem filas de espera, respeitando a sua agenda pessoal e profissional.',
      },
      {
        icon: ShieldCheck,
        title: 'Referência em Harmonização e Implantes',
        description: 'Tecnologia de ponta em ultrassom microfocado HIFU e odontologia estética ao alcance de Pato Branco.',
      },
    ],
    whatsappMsg: 'Olá, Dr. Adriano! Sou de Pato Branco e gostaria de agendar uma avaliação no consultório em São Lourenço do Oeste.',
  },
  curitiba: {
    cityName: 'Curitiba & Região Metropolitana',
    distance: 'Atendimento & Locação Logística Premium',
    route: 'Cobertura nos bairros Batel, Bigorrilho, Água Verde, Centro, S. J. dos Pinhais, Pinhais e Araucária',
    tagline: 'Locação de equipamentos de alta tecnologia Ultramed HIFU e estética facial avançada.',
    highlights: [
      {
        icon: Truck,
        title: 'Entrega & Logística Pontual em Curitiba',
        description: 'Entregamos o equipamento Ultramed HIFU higienizado, calibrado e testado diretamente na sua clínica ou consultório.',
      },
      {
        icon: Building2,
        title: 'Treinamento & Suporte Operacional',
        description: 'Fornecemos protocolos clínicos de aplicação, suporte técnico constante e orientação operacional completa.',
      },
      {
        icon: ShieldCheck,
        title: 'Tecnologia ANVISA de Alta Performance',
        description: 'Agregue valor e faturamento para sua clínica em Curitiba oferecendo lifting sem cortes aos seus clientes.',
      },
    ],
    whatsappMsg: 'Olá, Dr. Adriano! Falo de Curitiba e tenho interesse na locação do equipamento HIFU para minha clínica.',
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
      </div>
    </section>
  );
};

export default RegionalLocationCard;
