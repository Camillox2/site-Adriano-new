import React, { useState, useCallback } from 'react';
import { ArrowRight, X, CheckCircle, Phone, Smile, Heart, Syringe, FlaskConical } from 'lucide-react';
import { whatsapp } from '../utils/constants';

const SERVICES = [
  {
    id: 'ortodontia',
    Icon: Smile,
    color: 'text-primary-700 bg-primary-50',
    title: 'Ortodontia',
    description: 'Alinhamento dos dentes e correção da mordida com planejamento moderno.',
    fullDescription:
      'Tratamento especializado para correção da posição dos dentes e da mordida, com aparelhos convencionais e estéticos. Cada caso é planejado individualmente para um resultado eficiente e confortável.',
    benefits: [
      'Sorriso alinhado e harmônico',
      'Correção da mordida e da mastigação',
      'Facilita a higienização bucal',
      'Previne desgastes e problemas na ATM',
      'Opções estéticas discretas',
      'Acompanhamento próximo em todas as fases',
    ],
    process: [
      'Avaliação e documentação ortodôntica',
      'Planejamento individualizado',
      'Instalação do aparelho',
      'Acompanhamento periódico',
      'Finalização e contenção',
    ],
  },
  {
    id: 'implantes',
    Icon: Heart,
    color: 'text-secondary-700 bg-secondary-50',
    title: 'Implantes Dentários',
    description: 'Reposição definitiva de dentes perdidos com estética natural.',
    fullDescription:
      'Cirurgia de implantes com materiais biocompatíveis de alta qualidade e técnicas minimamente invasivas. Os implantes devolvem a função mastigatória e a estética com aparência completamente natural.',
    benefits: [
      'Solução fixa e duradoura',
      'Estética e função de dente natural',
      'Preserva o osso e os dentes vizinhos',
      'Devolve a confiança para sorrir e comer',
      'Técnicas minimamente invasivas',
      'Planejamento com exames de imagem',
    ],
    process: [
      'Avaliação clínica e exames de imagem',
      'Planejamento da cirurgia',
      'Instalação do implante',
      'Período de osseointegração',
      'Instalação da prótese definitiva',
    ],
  },
  {
    id: 'harmonizacao',
    Icon: Syringe,
    color: 'text-primary-700 bg-primary-50',
    title: 'Harmonização Orofacial',
    description: 'Rejuvenescimento e equilíbrio facial com resultados naturais.',
    fullDescription:
      'Procedimentos estéticos faciais como toxina botulínica, preenchimento com ácido hialurônico e bioestimuladores de colágeno. O foco é sempre a harmonia e a naturalidade — realçar a sua beleza, não transformá-la.',
    benefits: [
      'Suaviza rugas e linhas de expressão',
      'Reposição de volume e contorno facial',
      'Resultados imediatos e naturais',
      'Procedimentos minimamente invasivos',
      'Produtos de alta qualidade',
      'Avaliação facial completa',
    ],
    process: [
      'Consulta e análise facial',
      'Plano de tratamento personalizado',
      'Realização do procedimento',
      'Orientações pós-procedimento',
      'Acompanhamento e manutenção',
    ],
  },
  {
    id: 'ozonioterapia',
    Icon: FlaskConical,
    color: 'text-secondary-700 bg-secondary-50',
    title: 'Ozonioterapia',
    description: 'Terapia complementar que auxilia na cicatrização e no pós-operatório.',
    fullDescription:
      'A ozonioterapia é uma terapia complementar que utiliza o ozônio medicinal para auxiliar no controle de microrganismos, na cicatrização e na recuperação pós-procedimentos odontológicos.',
    benefits: [
      'Auxilia na cicatrização de tecidos',
      'Ação antimicrobiana',
      'Complementa tratamentos odontológicos',
      'Procedimento rápido e confortável',
      'Aplicação segura em consultório',
      'Indicado em diversos protocolos',
    ],
    process: [
      'Avaliação da indicação',
      'Definição do protocolo',
      'Aplicação em consultório',
      'Acompanhamento da evolução',
    ],
  },
];

const ServiceModal = ({ service, onClose }) => (
  <div
    className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
    onClick={onClose}
    role="dialog"
    aria-modal="true"
    aria-label={service.title}
  >
    <div
      className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-slate-100 px-6 md:px-8 py-5 flex items-center justify-between gap-4 rounded-t-3xl">
        <div className="flex items-center gap-4">
          <span className={`inline-flex p-3 rounded-2xl ${service.color}`}>
            <service.Icon size={26} aria-hidden="true" />
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">{service.title}</h2>
        </div>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          aria-label="Fechar"
        >
          <X size={22} />
        </button>
      </div>

      <div className="px-6 md:px-8 py-6 space-y-8">
        <p className="text-slate-600 leading-relaxed md:text-lg">{service.fullDescription}</p>

        <div>
          <h3 className="font-bold text-slate-900 mb-4 text-lg">Benefícios</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {service.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2.5">
                <CheckCircle size={19} className="text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-slate-700 text-sm md:text-base">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-slate-900 mb-4 text-lg">Como funciona</h3>
          <ol className="space-y-3">
            {service.process.map((step, index) => (
              <li key={step} className="flex items-center gap-3.5">
                <span className="w-8 h-8 shrink-0 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <span className="text-slate-700 text-sm md:text-base">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl text-center">
          <p className="text-slate-700 font-medium mb-4">
            Quer saber se este tratamento é indicado para o seu caso?
          </p>
          <a
            href={whatsapp(`Olá, Dr. Adriano! Gostaria de saber mais sobre ${service.title}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full sm:w-auto"
          >
            <Phone size={18} aria-hidden="true" />
            Agendar Avaliação
          </a>
        </div>
      </div>
    </div>
  </div>
);

const ServicesSection = () => {
  const [activeModal, setActiveModal] = useState(null);
  const close = useCallback(() => setActiveModal(null), []);

  return (
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {SERVICES.map((service) => (
            <article key={service.id} className="card card-lift p-7 flex flex-col">
              <span className={`inline-flex self-start p-3.5 rounded-2xl mb-5 ${service.color}`}>
                <service.Icon size={28} aria-hidden="true" />
              </span>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed flex-1">
                {service.description}
              </p>
              <button
                onClick={() => setActiveModal(service)}
                className="inline-flex items-center gap-2 text-primary-700 font-semibold mt-6 hover:gap-3.5 transition-all text-sm md:text-base"
              >
                Saiba mais
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>

        <div className="text-center mt-12 md:mt-16">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-slate-50 border border-slate-100 rounded-2xl px-8 py-6">
            <p className="text-slate-700 font-medium">
              Dúvidas sobre qual tratamento é ideal para você?
            </p>
            <a
              href={whatsapp('Olá, Dr. Adriano! Gostaria de uma orientação sobre os tratamentos.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dark !py-3 text-sm md:text-base whitespace-nowrap"
            >
              <Phone size={17} aria-hidden="true" />
              Falar com o Dr. Adriano
            </a>
          </div>
        </div>
      </div>

      {activeModal && <ServiceModal service={activeModal} onClose={close} />}
    </section>
  );
};

export default ServicesSection;
