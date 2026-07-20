import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { images } from '../assets';
import { WHATSAPP_DEFAULT, WHATSAPP_RENTAL } from '../utils/constants';

const NAV_ITEMS = [
  { label: 'Início', target: 'inicio' },
  { label: 'HIFU', target: 'hifu' },
  { label: 'Serviços', target: 'servicos' },
  { label: 'Sobre', target: 'sobre' },
  { label: 'Contato', target: 'contato' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isRentalPage = location.pathname === '/alugar_hifu';
  const whatsappHref = isRentalPage ? WHATSAPP_RENTAL : WHATSAPP_DEFAULT;
  const ctaLabel = isRentalPage ? 'Consultar locação' : 'Agendar Avaliação';

  // No topo da home o header é transparente; fora dela, sempre sólido
  const solid = scrolled || location.pathname !== '/' || menuOpen;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min((window.scrollY / max) * 100, 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Trava o scroll do body com o menu mobile aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const goToSection = (id) => {
    setMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        solid
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => goToSection('inicio')}
          className="flex items-center gap-3 text-left focus:outline-none"
          aria-label="Voltar ao início"
        >
          <img
            src={images.logo}
            alt="Logotipo Dr. Adriano Camillo"
            width="44"
            height="44"
            className="w-10 h-10 md:w-11 md:h-11 object-contain"
          />
          <span>
            <span
              className={`block text-base md:text-lg font-bold leading-tight ${
                solid ? 'text-slate-900' : 'text-white'
              }`}
            >
              Dr. Adriano Camillo
            </span>
            <span
              className={`block text-xs md:text-sm ${
                solid ? 'text-slate-500' : 'text-slate-200'
              }`}
            >
              Cirurgião-Dentista
            </span>
          </span>
        </button>

        {/* Navegação desktop */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Navegação principal">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.target}
              onClick={() => goToSection(item.target)}
              className={`px-3 lg:px-4 py-2 rounded-full text-sm lg:text-base font-medium transition-colors duration-200 ${
                solid
                  ? 'text-slate-700 hover:text-primary-700 hover:bg-primary-50'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA + menu mobile */}
        <div className="flex items-center gap-2">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex btn-primary !px-5 !py-2.5 md:!px-6 md:!py-3 text-sm md:text-base"
          >
            <Phone size={16} aria-hidden="true" />
            {ctaLabel}
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2.5 rounded-lg transition-colors ${
              solid ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-xl animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col" aria-label="Menu móvel">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.target}
                onClick={() => goToSection(item.target)}
                className="text-left text-slate-800 font-medium text-lg py-3.5 px-2 border-b border-slate-50 rounded-lg hover:bg-primary-50 hover:text-primary-700 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full mt-4 text-base"
            >
              <Phone size={18} aria-hidden="true" />
              {isRentalPage ? 'Consultar locação no WhatsApp' : 'Agendar Avaliação no WhatsApp'}
            </a>
          </nav>
        </div>
      )}

      {/* Barra de progresso da leitura */}
      <div
        className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-primary-600 via-secondary-500 to-emerald-400 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%`, opacity: solid ? 1 : 0 }}
        aria-hidden="true"
      ></div>
    </header>
  );
};

export default Header;
