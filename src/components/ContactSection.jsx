import React from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Instagram,
  Mail,
  ArrowRight,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import {
  SITE,
  LOCATIONS,
  whatsapp,
  WHATSAPP_DEFAULT,
  WHATSAPP_EMERGENCY,
} from '../utils/constants';

const CONTACT_METHODS = [
  {
    Icon: Phone,
    title: 'WhatsApp',
    description: 'A forma mais rápida de agendar. Resposta ágil e atendimento personalizado.',
    value: SITE.phone,
    href: WHATSAPP_DEFAULT,
    buttonText: 'Chamar no WhatsApp',
    primary: true,
  },
  {
    Icon: Instagram,
    title: 'Instagram',
    description: 'Acompanhe resultados, novidades e o dia a dia do consultório.',
    value: SITE.instagramHandle,
    href: SITE.instagram,
    buttonText: 'Seguir no Instagram',
    primary: false,
  },
  {
    Icon: Mail,
    title: 'E-mail',
    description: 'Prefere escrever? Envie sua dúvida com calma e detalhes.',
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    buttonText: 'Enviar e-mail',
    primary: false,
  },
];

const ContactSection = () => (
  <section id="contato" className="section bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <span className="section-eyebrow">Contato</span>
        <h2 className="section-title mt-5">
          Agende sua <span className="text-primary-700">avaliação</span>
        </h2>
        <p className="section-subtitle mt-5">
          O primeiro passo para o seu novo sorriso é simples: escolha o canal
          que preferir e fale diretamente com a equipe do Dr. Adriano.
        </p>
      </div>

      {/* Canais de contato */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-14 md:mb-20 max-w-5xl mx-auto">
        {CONTACT_METHODS.map(({ Icon, title, description, value, href, buttonText, primary }) => (
          <div
            key={title}
            className={`card card-lift p-7 text-center flex flex-col ${
              primary ? 'ring-2 ring-secondary-500 shadow-lg' : ''
            }`}
          >
            {primary && (
              <span className="self-center -mt-10 mb-3 bg-secondary-600 text-white text-xs font-bold tracking-wide uppercase px-4 py-1.5 rounded-full shadow">
                Recomendado
              </span>
            )}
            <span
              className={`inline-flex self-center p-4 rounded-2xl mb-4 ${
                primary ? 'bg-secondary-50 text-secondary-700' : 'bg-primary-50 text-primary-700'
              }`}
            >
              <Icon size={28} aria-hidden="true" />
            </span>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed flex-1">{description}</p>
            <p className="font-semibold text-slate-800 my-4">{value}</p>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={primary ? 'btn-primary w-full !py-3.5' : 'btn-outline w-full !py-3'}
            >
              {buttonText}
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        ))}
      </div>

      {/* Local principal + horários */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto mb-14">
        <div className="card p-7 md:p-8">
          <h3 className="flex items-center gap-3 text-xl font-bold text-slate-900 mb-5">
            <MapPin className="text-primary-700" size={24} aria-hidden="true" />
            Consultório principal
          </h3>
          <p className="font-semibold text-slate-800">São Lourenço do Oeste — SC</p>
          <p className="text-slate-600 mt-1">{LOCATIONS[0].address}</p>
          <a
            href={LOCATIONS[0].mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary-700 font-semibold mt-4 hover:underline"
          >
            <ExternalLink size={16} aria-hidden="true" />
            Como chegar (Google Maps)
          </a>
          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-sm text-slate-600 leading-relaxed">
              Também atendemos com agendamento em{' '}
              <strong>Realeza</strong>, <strong>Ampére</strong> e{' '}
              <strong>Curitiba (domiciliar)</strong> — consulte disponibilidade
              pelo WhatsApp.
            </p>
          </div>
        </div>

        <div className="card p-7 md:p-8">
          <h3 className="flex items-center gap-3 text-xl font-bold text-slate-900 mb-5">
            <Clock className="text-primary-700" size={24} aria-hidden="true" />
            Horários de atendimento
          </h3>
          <ul className="space-y-3 text-slate-700">
            <li className="flex justify-between gap-4 pb-3 border-b border-slate-100">
              <span>Segunda a sexta</span>
              <span className="font-semibold">8h às 18h</span>
            </li>
            <li className="flex justify-between gap-4 pb-3 border-b border-slate-100">
              <span>Sábado</span>
              <span className="font-semibold">8h às 12h</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Domingo</span>
              <span className="font-semibold text-slate-500">Fechado</span>
            </li>
          </ul>
          <a
            href={whatsapp('Olá! Gostaria de saber os horários disponíveis para agendamento.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full mt-6 !py-3.5"
          >
            <Phone size={18} aria-hidden="true" />
            Consultar horários disponíveis
          </a>
        </div>
      </div>

      {/* Urgência */}
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-5 bg-red-50 border border-red-100 rounded-2xl p-6 md:p-7">
          <span className="shrink-0 p-3.5 bg-red-100 text-red-600 rounded-2xl">
            <AlertCircle size={28} aria-hidden="true" />
          </span>
          <div className="text-center sm:text-left flex-1">
            <h4 className="font-bold text-red-900 text-lg">Urgência odontológica?</h4>
            <p className="text-red-800/80 text-sm mt-1 leading-relaxed">
              Dor forte, trauma ou emergência? Chame no WhatsApp para
              atendimento prioritário.
            </p>
          </div>
          <a
            href={WHATSAPP_EMERGENCY}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-red-600 text-white px-6 py-3 hover:bg-red-700 shadow-lg shadow-red-600/25 whitespace-nowrap"
          >
            Atendimento de urgência
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
