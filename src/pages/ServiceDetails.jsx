import React, { useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Clock,
  MapPin,
  Phone,
  Sparkles,
  Star,
  Shield,
  Heart,
  Stethoscope,
  Award,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import { SERVICE_PAGES } from '../data/servicePages';
import { ADDRESS, whatsapp } from '../utils/constants';
import { images } from '../assets';

/* ---------- icon pool para benefícios (rotativo) ---------- */
const BENEFIT_ICONS = [CheckCircle, Star, Shield, Heart, Sparkles, Award];

/* ---------- FAQ item animado ---------- */
const FaqItem = ({ faq, open, onToggle, index }) => (
  <Reveal delay={index * 80}>
    <div className="card overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
        aria-expanded={open}
      >
        <span className="font-bold text-slate-900 md:text-lg">{faq.question}</span>
        <ChevronDown
          size={22}
          className={`shrink-0 text-primary-700 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="px-5 md:px-6 pb-5 md:pb-6 -mt-1 animate-fade-in">
          <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  </Reveal>
);

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
            name: page.cityName || 'São Lourenço do Oeste',
            address: { '@type': 'PostalAddress', addressRegion: page.cityState || 'SC', addressCountry: 'BR' },
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
        {/* ══════════════ HERO ══════════════ */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-slate-900 overflow-hidden">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${images.consultorio1})` }}
            aria-hidden="true"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/80 to-slate-900" />
          {/* Glow orbs */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-600/15 rounded-full blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl" aria-hidden="true" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <Reveal>
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-medium text-emerald-300 mb-6">
                  <Stethoscope size={15} aria-hidden="true" />
                  {page.eyebrow}
                </span>
              </Reveal>
              <Reveal delay={100}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                  {page.heading}
                </h1>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-lg md:text-xl text-slate-300 mt-6 leading-relaxed">{page.intro}</p>
              </Reveal>
              <Reveal delay={300}>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-8">
                  <a
                    href={whatsapp(page.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-base md:text-lg"
                  >
                    <Phone size={18} aria-hidden="true" />
                    Agendar avaliação
                  </a>
                  <button
                    onClick={() =>
                      document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="btn-outline-light text-base md:text-lg"
                  >
                    Como funciona
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══════════════ CONTEÚDO PRINCIPAL ══════════════ */}
        <section className="section bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <Reveal>
                  <span className="section-eyebrow">Atendimento personalizado</span>
                  <h2 className="section-title mt-5">{page.sectionTitle}</h2>
                </Reveal>
                <Reveal delay={100}>
                  <div className="space-y-5 mt-6 text-slate-600 leading-relaxed md:text-lg">
                    {page.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </Reveal>
              </div>

              {/* Imagem do consultório com badge flutuante */}
              <Reveal delay={200}>
                <div className="relative">
                  <img
                    src={images.consultorio2}
                    alt="Consultório Dr. Adriano Camillo em São Lourenço do Oeste"
                    loading="lazy"
                    width="720"
                    height="960"
                    className="rounded-3xl shadow-2xl w-full object-cover max-h-[28rem] object-center"
                  />
                  <div className="absolute -bottom-5 left-6 right-6 sm:left-10 sm:right-10 bg-white shadow-xl rounded-2xl px-6 py-4 flex items-center gap-4 border border-slate-100">
                    <Award className="text-emerald-600 shrink-0" size={30} aria-hidden="true" />
                    <p className="text-sm text-slate-700 leading-snug">
                      <strong className="text-slate-900">+30 anos de experiência clínica</strong>
                      <br />
                      Dr. Adriano Camillo — CRO-SC
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══════════════ BENEFÍCIOS (grid de cards com ícone) ══════════════ */}
        <section className="section bg-slate-50">
          <div className="container mx-auto px-4">
            <Reveal className="text-center max-w-2xl mx-auto mb-12">
              <span className="section-eyebrow">Benefícios</span>
              <h2 className="section-title mt-5">O que você pode esperar</h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {page.benefits.map((benefit, index) => {
                const Icon = BENEFIT_ICONS[index % BENEFIT_ICONS.length];
                return (
                  <Reveal key={benefit} delay={index * 80}>
                    <div className="card card-lift p-7 h-full">
                      <span className="inline-flex p-3 rounded-2xl bg-primary-50 text-primary-700 mb-4">
                        <Icon size={26} aria-hidden="true" />
                      </span>
                      <p className="text-slate-700 leading-relaxed">{benefit}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════ PASSO A PASSO (timeline) ══════════════ */}
        <section id="como-funciona" className="section bg-white">
          <div className="container mx-auto px-4">
            <Reveal className="text-center max-w-2xl mx-auto mb-12">
              <span className="section-eyebrow">Passo a passo</span>
              <h2 className="section-title mt-5">Seu atendimento, do início ao fim</h2>
            </Reveal>
            <div className="max-w-3xl mx-auto relative">
              {/* Linha vertical conectando etapas */}
              <div
                className="absolute left-[21px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-primary-500 via-secondary-500 to-emerald-400 hidden sm:block"
                aria-hidden="true"
              />
              <div className="space-y-5">
                {page.steps.map((step, index) => (
                  <Reveal key={step} delay={index * 120}>
                    <div className="relative sm:pl-16">
                      <span className="hidden sm:flex absolute left-0 top-5 w-11 h-11 bg-primary-600 text-white rounded-full items-center justify-center font-bold text-lg ring-4 ring-white shadow-lg z-10">
                        {index + 1}
                      </span>
                      <div className="card p-6 md:p-7">
                        <h3 className="font-bold text-slate-900 text-lg flex items-center gap-3">
                          <span className="sm:hidden inline-flex w-8 h-8 shrink-0 bg-primary-600 text-white rounded-full items-center justify-center font-bold text-sm">
                            {index + 1}
                          </span>
                          {step}
                        </h3>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ FAQ ══════════════ */}
        <section className="section bg-slate-50">
          <div className="container mx-auto px-4">
            <Reveal className="text-center max-w-2xl mx-auto mb-12">
              <span className="section-eyebrow">Dúvidas frequentes</span>
              <h2 className="section-title mt-5">Perguntas sobre {page.label.toLowerCase()}</h2>
            </Reveal>
            <div className="max-w-3xl mx-auto space-y-4">
              {page.faqs.map((faq, index) => (
                <FaqItem
                  key={faq.question}
                  faq={faq}
                  index={index}
                  open={openFaq === index}
                  onToggle={() => setOpenFaq(openFaq === index ? -1 : index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ CTA FINAL ══════════════ */}
        <section className="section bg-slate-900 relative overflow-hidden">
          {/* Glow orbs */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary-600/20 rounded-full blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-600/20 rounded-full blur-3xl" aria-hidden="true" />

          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="max-w-2xl mx-auto">
              <Reveal>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Vamos conversar sobre o seu caso?
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <p className="text-slate-300 mt-5 mb-4 text-lg leading-relaxed">
                  Atendimento no consultório em São Lourenço do Oeste — SC. Agende sua avaliação pelo WhatsApp.
                </p>
              </Reveal>
              <Reveal delay={150}>
                <div className="flex flex-col sm:flex-row gap-4 mt-6 text-sm text-slate-400 justify-center">
                  <span className="flex items-center gap-2"><MapPin size={18} aria-hidden="true" />{ADDRESS.street}</span>
                  <span className="flex items-center gap-2"><Clock size={18} aria-hidden="true" />Seg a sex, 8h às 18h</span>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <a
                  href={whatsapp(page.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-base md:text-lg mt-8 inline-flex"
                >
                  Agendar pelo WhatsApp
                  <ArrowRight size={20} aria-hidden="true" />
                </a>
              </Reveal>
              <Reveal delay={250}>
                <p className="text-slate-500 text-sm mt-6">
                  São Lourenço do Oeste • Chapecó • Pato Branco • Ampére • Realeza • Novo Horizonte
                </p>
              </Reveal>
              <Reveal delay={300}>
                <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mt-8 text-sm font-medium transition-colors">
                  <ArrowLeft size={17} aria-hidden="true" />
                  Voltar para a página inicial
                </Link>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ServiceDetails;
