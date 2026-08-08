import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import { SITE } from '../utils/constants';

const PrivacyPolicy = () => (
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
              Quando você aceita a medição de audiência, o site utiliza o Google Analytics 4 para entender, de forma agregada, quais páginas são acessadas e quais links de contato recebem cliques. A medição não é carregada antes da sua escolha.
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
              Você pode aceitar ou recusar a medição de audiência no aviso exibido no site. A escolha fica registrada neste navegador e pode ser alterada ao limpar os dados de navegação.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-900">Fale conosco</h2>
            <p className="mt-3">
              Para dúvidas sobre privacidade ou sobre seus dados, entre em contato pelo e-mail{' '}
              <a className="text-primary-700 font-semibold hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>
          </section>
        </div>
      </article>
    </main>
    <Footer />
  </div>
);

export default PrivacyPolicy;
