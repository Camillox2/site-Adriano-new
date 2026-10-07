import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import { PAGE_META } from '../data/pageMeta';
import { WHATSAPP_DEFAULT } from '../utils/constants';

const CONSENT_KEY = 'dr-adriano-analytics-consent';

const PrivacyPolicy = () => {
  const reopenConsentChoices = () => {
    window.localStorage.removeItem(CONSENT_KEY);
    window.location.reload();
  };

  return (
  <div className="min-h-screen bg-white">
    <Seo
      title={PAGE_META['/politica-de-privacidade'].title}
      description={PAGE_META['/politica-de-privacidade'].description}
      path="/politica-de-privacidade"
    />
    <Header />
    <main className="pt-32 pb-20 md:pt-40 md:pb-28">
      <article className="container mx-auto px-4 max-w-3xl">
        <span className="section-eyebrow">Privacidade</span>
        <h1 className="section-title mt-5">Política de Privacidade</h1>
        <p className="text-slate-600 leading-relaxed mt-6">
          Esta política explica, de forma simples, como o site do Dr. Adriano Camillo trata dados de navegação.
        </p>

        <div className="mt-10 space-y-8 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900">Dados de navegação</h2>
            <p className="mt-3">
              O site utiliza o Google Analytics 4 e o Google Ads, com cookies, para entender, de forma agregada, quais páginas são acessadas e quais contatos pelo WhatsApp e telefone são iniciados, e para medir o desempenho dos nossos anúncios. Não usamos esses dados para personalização de anúncios.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900">Contato pelo WhatsApp</h2>
            <p className="mt-3">
              Ao escolher falar pelo WhatsApp, você será direcionado para a plataforma do WhatsApp. As informações enviadas na conversa são tratadas no canal de atendimento para responder ao seu pedido.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900">Sua escolha</h2>
            <p className="mt-3">
              O aviso exibido no site informa sobre o uso de cookies de medição. Se preferir, você pode bloquear ou apagar cookies nas configurações do seu navegador.
            </p>
            <button type="button" className="mt-4 text-primary-700 font-semibold hover:underline" onClick={reopenConsentChoices}>
              Exibir novamente o aviso de cookies
            </button>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900">Fale conosco</h2>
            <p className="mt-3">
              Para dúvidas sobre privacidade ou sobre seus dados, entre em contato pelo{' '}
              <a className="text-primary-700 font-semibold hover:underline" href={WHATSAPP_DEFAULT} target="_blank" rel="noopener noreferrer">WhatsApp</a>.
            </p>
          </section>
        </div>
      </article>
    </main>
    <Footer />
  </div>
  );
};

export default PrivacyPolicy;
