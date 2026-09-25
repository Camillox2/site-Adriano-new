import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import { NOT_FOUND_META } from '../data/pageMeta';
import { WHATSAPP_DEFAULT } from '../utils/constants';

/**
 * Página 404 no visual do site. A Vercel entrega build/404.html com status
 * HTTP 404 para endereços inexistentes; o React mostra esta página nesse caso.
 */
const NotFound = () => (
  <div className="min-h-screen bg-white">
    <Seo title={NOT_FOUND_META.title} description={NOT_FOUND_META.description} path="/404" noindex />
    <Header />
    <main>
      <section className="relative min-h-[80svh] flex items-center overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-primary-900/60" aria-hidden="true" />
        <div className="container mx-auto px-4 relative z-10 pt-28 pb-20 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-medium text-emerald-300">
            Erro 404
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl font-bold leading-tight tracking-tight">{NOT_FOUND_META.h1}</h1>
          <p className="mt-5 text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            O endereço que você acessou não existe ou mudou. Volte para a página inicial ou fale com a nossa equipe pelo WhatsApp.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="btn-outline-light text-base md:text-lg">
              <ArrowLeft size={20} aria-hidden="true" />
              Página inicial
            </Link>
            <a
              href={WHATSAPP_DEFAULT}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base md:text-lg"
            >
              <MessageCircle size={20} aria-hidden="true" />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default NotFound;
