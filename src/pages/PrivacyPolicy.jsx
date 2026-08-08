import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
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
      title="Política de Privacidade | Dr. Adriano Camillo"
      description="Política de privacidade do site do Dr. Adriano Camillo."
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
              O site carrega a tag do Google Analytics 4 e do Google Ads com cookies desativados por padrão. Quando você aceita a medição, usamos cookies para entender, de forma agregada, quais páginas são acessadas e quais contatos pelo WhatsApp são iniciados. Se você recusar, não gravamos cookies de Analytics ou Ads; a tag opera apenas com sinais técnicos sem identificação para respeitar sua escolha e permitir medição agregada.
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
              Você pode aceitar ou recusar a medição de audiência no aviso exibido no site. A escolha fica registrada neste navegador e pode ser alterada a qualquer momento.
            </p>
            <button type="button" className="mt-4 text-primary-700 font-semibold hover:underline" onClick={reopenConsentChoices}>
              Alterar preferência de medição
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
