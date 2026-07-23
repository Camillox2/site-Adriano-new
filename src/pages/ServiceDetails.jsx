import React, { useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle,
  ChevronDown,
  Clock,
  MapPin,
  Phone,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import Seo from '../components/Seo';
import { SERVICE_PAGES } from '../data/servicePages';
import { ADDRESS, whatsapp } from '../utils/constants';

const ServiceDetails = () => {
  const { slug } = useParams();
  const page = SERVICE_PAGES[slug];
  const [openFaq, setOpenFaq] = useState(0);

  const jsonLd = useMemo(() => {
    if (!page) return null;

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          '@id': `https://dradrianocamillo.com/${page.slug}#service`,
          name: page.label,
          description: page.description,
          url: `https://dradrianocamillo.com/${page.slug}`,
          provider: { '@id': 'https://dradrianocamillo.com/#clinica' },
          areaServed: {
            '@type': 'City',
            name: 'São Lourenço do Oeste',
            address: { '@type': 'PostalAddress', addressRegion: 'SC', addressCountry: 'BR' },
          },
        },
        {
          '@type': 'FAQPage',
          mainEntity: page.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        },
      ],
    };
  }, [page]);

  if (!page) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title={page.title}
        description={page.description}
        path={`/${page.slug}`}
        jsonLd={jsonLd}
      />
      <Header />

      <main>
        <section className="bg-slate-900 pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white">
              <span className="inline-flex bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-medium text-emerald-300">
                {page.eyebrow}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mt-6">
                {page.heading}
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mt-6 leading-relaxed">{page.intro}</p>
              <a
                href={whatsapp(page.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base md:text-lg mt-8"
              >
                <Phone size={18} aria-hidden="true" />
                Agendar avaliação
              </a>
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-10 lg:gap-16 items-start">
              <div>
                <span className="section-eyebrow">Atendimento personalizado</span>
                <h2 className="section-title mt-5">{page.sectionTitle}</h2>
                <div className="space-y-5 mt-6 text-slate-600 leading-relaxed md:text-lg">
                  {page.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <aside className="card p-7 md:p-8">
                <h2 className="text-xl font-bold text-slate-900">O que você pode esperar da avaliação</h2>
                <ul className="mt-6 space-y-4">
                  {page.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle className="text-emerald-600 shrink-0 mt-0.5" size={20} aria-hidden="true" />
                      <span className="text-slate-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <section className="section bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="section-eyebrow">Como funciona</span>
              <h2 className="section-title mt-5">Seu atendimento, passo a passo</h2>
            </div>
            <ol className="max-w-4xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {page.steps.map((step, index) => (
                <li key={step} className="card p-6 flex items-start gap-4">
                  <span className="w-9 h-9 shrink-0 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  <span className="text-slate-700 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="section-eyebrow">Dúvidas frequentes</span>
              <h2 className="section-title mt-5">Perguntas sobre {page.label.toLowerCase()}</h2>
            </div>
            <div className="max-w-4xl mx-auto mt-12 space-y-4">
              {page.faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <article key={faq.question} className="card overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="font-bold text-slate-900 md:text-lg">{faq.question}</span>
                      <ChevronDown
                        size={22}
                        className={`shrink-0 text-primary-700 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen ? (
                      <p className="px-5 md:px-6 pb-5 md:pb-6 -mt-1 text-slate-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">Vamos conversar sobre o seu caso?</h2>
                <p className="text-slate-300 mt-4 leading-relaxed md:text-lg">
                  Atendimento no consultório em São Lourenço do Oeste. Agende sua avaliação pelo WhatsApp.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-6 text-sm text-slate-300">
                  <span className="flex items-center gap-2"><MapPin size={18} aria-hidden="true" />{ADDRESS.street}</span>
                  <span className="flex items-center gap-2"><Clock size={18} aria-hidden="true" />Seg a sex, 8h às 18h</span>
                </div>
              </div>
              <a
                href={whatsapp(page.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary whitespace-nowrap"
              >
                Agendar pelo WhatsApp
              </a>
            </div>
            <Link to="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white mt-10 text-sm font-medium">
              <ArrowLeft size={17} aria-hidden="true" />
              Voltar para a página inicial
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ServiceDetails;
