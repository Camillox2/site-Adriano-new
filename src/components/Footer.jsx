import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Phone, Instagram, MapPin, Clock, Mail } from 'lucide-react';
import { images } from '../assets';
import { SITE, ADDRESS, WHATSAPP_DEFAULT } from '../utils/constants';

const QUICK_LINKS = [
  { text: 'Início', target: 'inicio' },
  { text: 'HIFU', target: 'hifu' },
  { text: 'Serviços', target: 'servicos' },
  { text: 'Sobre', target: 'sobre' },
  { text: 'Contato', target: 'contato' },
];

const SERVICES = [
  'HIFU — Ultrassom Microfocado',
  'Ortodontia',
  'Implantes Dentários',
  'Harmonização Orofacial',
  'Ozonioterapia',
];

const SERVICE_LINKS = [
  '/hifu',
  '/ortodontia-sao-lourenco-do-oeste',
  '/implantes-dentarios-sao-lourenco-do-oeste',
  '/harmonizacao-orofacial-sao-lourenco-do-oeste',
  '/ozonioterapia-sao-lourenco-do-oeste',
];

const Footer = () => {
  const year = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const goToSection = (id) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="container mx-auto px-4">
        <div className="py-14 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Marca */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src={images.logo}
                alt="Logotipo Dr. Adriano Camillo"
                width="48"
                height="48"
                className="w-12 h-12 object-contain"
                loading="lazy"
              />
              <div>
                <p className="text-lg font-bold text-white leading-tight">Dr. Adriano Camillo</p>
                <p className="text-sm text-slate-300">Cirurgião-Dentista</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-300 mb-6">
              Odontologia e estética facial avançada com tecnologia de ponta e
              atendimento humanizado em São Lourenço do Oeste e região.
            </p>
            <div className="flex gap-3">
              <a
                href={WHATSAPP_DEFAULT}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-secondary-600 hover:bg-secondary-500 rounded-full flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <Phone size={19} className="text-white" />
              </a>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={19} className="text-white" />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="w-11 h-11 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="E-mail"
              >
                <Mail size={19} className="text-white" />
              </a>
            </div>
          </div>

          {/* Links rápidos */}
          <nav aria-label="Links do rodapé">
            <h3 className="text-white font-bold mb-5">Navegação</h3>
            <ul className="space-y-2.5 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.target}>
                  <button
                    onClick={() => goToSection(link.target)}
                    className="hover:text-white transition-colors"
                  >
                    {link.text}
                  </button>
                </li>
              ))}
              <li>
                <Link to="/hifu" className="hover:text-white transition-colors">
                  Página completa do HIFU
                </Link>
              </li>
            </ul>
          </nav>

          {/* Serviços */}
          <div>
            <h3 className="text-white font-bold mb-5">Serviços</h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              {SERVICES.map((service, index) => (
                <li key={service}>
                  {SERVICE_LINKS[index] ? (
                    <Link to={SERVICE_LINKS[index]} className="hover:text-white transition-colors">
                      {service}
                    </Link>
                  ) : service}
                </li>
              ))}
              <li>
                <Link to="/odontologia-estetica-sao-lourenco-do-oeste" className="hover:text-white transition-colors">
                  Odontologia Estética
                </Link>
              </li>
              <li>
                <Link to="/dtm-dor-orofacial" className="hover:text-white transition-colors">
                  DTM e Dor Orofacial
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-white font-bold mb-5">Contato</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone size={17} className="text-secondary-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <a href={WHATSAPP_DEFAULT} target="_blank" rel="noopener noreferrer" className="text-white font-semibold hover:underline">
                    {SITE.phone}
                  </a>
                  <span className="block text-slate-300">WhatsApp</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={17} className="text-primary-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  {ADDRESS.street}
                  <span className="block text-slate-300">
                    {ADDRESS.city} — {ADDRESS.state}
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={17} className="text-secondary-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  Seg a sex: 8h às 18h
                  <span className="block text-slate-300">Sábado: 8h às 12h</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra final */}
        <div className="py-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-slate-400">
          <p>
            © {year} Dr. Adriano Camillo — Todos os direitos reservados.
          </p>
          <p>
            Atendimento para São Lourenço do Oeste • Chapecó • Pato Branco • Ampére • Realeza • Novo Horizonte
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
