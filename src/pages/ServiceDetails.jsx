import React, { useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Clock,
  GraduationCap,
  Heart,
  MapPin,
  Phone,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Target,
  Timer,
  TrendingUp,
  Zap,
  Award,
  Instagram,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import CountUp from '../components/CountUp';
import HifuRentalDetails from './HifuRentalDetails';
import { SERVICE_PAGES } from '../data/servicePages';
import { ADDRESS, SITE, whatsapp } from '../utils/constants';
import { images } from '../assets';

/* ---------- ícones disponíveis ---------- */
const ICON_MAP = {
  CheckCircle,
  Shield,
  ShieldCheck,
  Zap,
  Target,
  Timer,
  TrendingUp,
  Heart,
  Sparkles,
  Star,
  GraduationCap,
  Award,
  Stethoscope,
};

const resolveIcon = (name) => ICON_MAP[name] || CheckCircle;

/* ---------- ícones rotativos para benefícios ---------- */
const BENEFIT_ICONS = [Target, ShieldCheck, TrendingUp, Heart, Sparkles, Award];

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

  /* helpers para dados com fallback */
  const stats = page.stats || [];
  const highlights = page.highlights || [];
  const hasBenefitObjects = page.benefits?.[0]?.title !== undefined;
  const hasStepObjects = page.steps?.[0]?.title !== undefined;

  if (page.isRental) {
    return (
      <div className="min-h-screen bg-white">
        <Seo
          title={page.title}
          description={page.description}
          path={`/${page.slug}`}
          jsonLd={jsonLd}
        />
        <Header />
        <HifuRentalDetails data={page} />
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

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
        {/* ══════════════════════════════════════════════════
            HERO — estilo idêntico à Home (vídeo/foto bg,
            foto do Dr., barra de stats, badge flutuante)
           ══════════════════════════════════════════════════ */}
        <section className="relative min-h-[85svh] flex flex-col justify-center overflow-hidden bg-slate-900">
          {/* Background */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div
              className="w-full h-full bg-cover bg-center animate-kenburns"
              style={{ backgroundImage: `url(${images.consultorio1})` }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-900/60" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/90 to-transparent" />

          <div className="container mx-auto px-4 relative z-10 pt-28 pb-16 lg:pt-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Texto */}
              <div className="text-white space-y-6 text-center lg:text-left animate-fade-in-up">
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-emerald-300">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-soft" aria-hidden="true" />
                  {page.eyebrow}
                </span>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                  {page.heading}
                </h1>

                <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {page.intro}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start pt-2">
                  <a
                    href={whatsapp(page.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-base md:text-lg"
                  >
                    <Phone size={20} aria-hidden="true" />
                    Agendar Avaliação
                  </a>
                  <button
                    onClick={() =>
                      document.getElementById('beneficios')?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="btn-outline-light text-base md:text-lg"
                  >
                    Ver benefícios
                  </button>
                </div>

                <p className="text-sm text-slate-300 flex items-center justify-center lg:justify-start gap-2">
                  <ShieldCheck size={16} className="text-emerald-400" aria-hidden="true" />
                  Resposta rápida pelo WhatsApp • Avaliação sem compromisso
                </p>
              </div>

              {/* Foto do Dr. Adriano */}
              <div className="flex justify-center lg:justify-end animate-fade-in-right order-first lg:order-last">
                <div className="relative">
                  <div
                    className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/30 to-primary-500/30 rounded-[2rem] blur-2xl"
                    aria-hidden="true"
                  />
                  <img
                    src={images.drAdriano}
                    alt="Dr. Adriano Camillo em seu consultório"
                    width="480"
                    height="480"
                    loading="eager"
                    className="relative w-60 sm:w-72 lg:w-[22rem] h-auto object-contain rounded-[2rem] shadow-2xl ring-1 ring-white/20"
                  />
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 lg:left-auto lg:-translate-x-0 lg:-right-4 bg-white text-slate-900 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 w-max max-w-[90vw]">
                    <ShieldCheck className="text-emerald-600 shrink-0" size={24} aria-hidden="true" />
                    <span className="text-sm font-semibold leading-tight whitespace-nowrap">
                      Especialista em {page.label}
                      <span className="block text-xs font-normal text-slate-500 whitespace-nowrap">
                        Dr. Adriano Camillo — CRO-SC
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Barra de confiança com números animados */}
            {stats.length > 0 && (
              <div className="mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto lg:mx-0">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-center lg:justify-start gap-4 bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl px-6 py-4"
                  >
                    <Star className="text-emerald-400 shrink-0" size={28} aria-hidden="true" />
                    <span>
                      <CountUp end={parseInt(stat.value, 10) || 0} suffix={stat.suffix || ''} className="block text-2xl font-bold text-white" />
                      <span className="block text-sm text-slate-300">{stat.label}</span>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            DESTAQUES (highlights) — 2 colunas com ícone
           ══════════════════════════════════════════════════ */}
        {highlights.length > 0 && (
          <section className="section bg-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {highlights.map((hl, i) => {
                  const Icon = resolveIcon(hl.icon);
                  return (
                    <Reveal key={hl.title} delay={i * 120}>
                      <div className="flex items-start gap-5 bg-slate-50 rounded-2xl border border-slate-100 p-7 md:p-8">
                        <span className="inline-flex p-3 rounded-2xl bg-primary-50 text-primary-700 shrink-0">
                          <Icon size={28} aria-hidden="true" />
                        </span>
                        <div>
                          <h3 className="font-bold text-slate-900 text-lg mb-2">{hl.title}</h3>
                          <p className="text-slate-600 leading-relaxed">{hl.text}</p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════
            CONTEÚDO + FOTO CONSULTÓRIO (estilo About)
           ══════════════════════════════════════════════════ */}
        <section className="section bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-center">
              {/* Foto */}
              <Reveal className="lg:col-span-2 flex justify-center">
                <div className="relative">
                  <div
                    className="absolute -inset-3 bg-gradient-to-tr from-primary-200 to-emerald-200 rounded-[2rem] blur-xl opacity-70"
                    aria-hidden="true"
                  />
                  <img
                    src={images.consultorio2}
                    alt="Interior do consultório do Dr. Adriano Camillo em São Lourenço do Oeste"
                    loading="lazy"
                    width="440"
                    height="520"
                    className="relative w-72 h-80 sm:w-80 sm:h-96 lg:w-[24rem] lg:h-[28rem] object-cover object-center rounded-[2rem] shadow-2xl"
                  />
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-2xl px-6 py-3 text-center border border-slate-100 whitespace-nowrap">
                    <span className="block font-bold text-slate-900">{page.label}</span>
                    <span className="block text-sm text-slate-500">São Lourenço do Oeste - SC</span>
                  </div>
                </div>
              </Reveal>

              {/* Texto */}
              <div className="lg:col-span-3 space-y-6">
                <Reveal>
                  <span className="section-eyebrow">Atendimento personalizado</span>
                  <h2 className="section-title mt-5">{page.sectionTitle}</h2>
                </Reveal>
                <Reveal delay={100}>
                  <div className="space-y-5 text-slate-600 leading-relaxed md:text-lg">
                    {page.paragraphs.map((paragraph) => (
                      <p key={paragraph.substring(0, 40)}>{paragraph}</p>
                    ))}
                  </div>
                </Reveal>
                <Reveal delay={200}>
                  <a
                    href={SITE.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary-700 font-semibold hover:gap-3 transition-all"
                  >
                    <Instagram size={18} aria-hidden="true" />
                    Acompanhe o dia a dia no Instagram
                  </a>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            BENEFÍCIOS — grid de cards com ícone e descrição
           ══════════════════════════════════════════════════ */}
        <section id="beneficios" className="section bg-white">
          <div className="container mx-auto px-4">
            <Reveal className="text-center max-w-2xl mx-auto mb-12">
              <span className="section-eyebrow">Benefícios</span>
              <h2 className="section-title mt-5">Por que escolher esse tratamento</h2>
              <p className="section-subtitle mt-5">
                Cada detalhe do tratamento é planejado para entregar o melhor resultado
                com segurança e conforto.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {page.benefits.map((benefit, index) => {
                const Icon = BENEFIT_ICONS[index % BENEFIT_ICONS.length];
                const title = hasBenefitObjects ? benefit.title : benefit;
                const desc = hasBenefitObjects ? benefit.description : null;
                return (
                  <Reveal key={title} delay={index * 80}>
                    <div className="card card-lift p-7 h-full">
                      <span className="inline-flex p-3 rounded-2xl bg-primary-50 text-primary-700 mb-4">
                        <Icon size={26} aria-hidden="true" />
                      </span>
                      <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
                      {desc && (
                        <p className="text-slate-600 text-sm md:text-base leading-relaxed">{desc}</p>
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            PASSO A PASSO — timeline com linha vertical
           ══════════════════════════════════════════════════ */}
        <section id="como-funciona" className="section bg-slate-50">
          <div className="container mx-auto px-4">
            <Reveal className="text-center max-w-2xl mx-auto mb-12">
              <span className="section-eyebrow">Passo a passo</span>
              <h2 className="section-title mt-5">Como funciona o tratamento</h2>
            </Reveal>
            <div className="max-w-3xl mx-auto relative">
              {/* Linha vertical */}
              <div
                className="absolute left-[21px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-primary-500 via-secondary-500 to-emerald-400 hidden sm:block"
                aria-hidden="true"
              />
              <div className="space-y-5">
                {page.steps.map((step, index) => {
                  const stepTitle = hasStepObjects ? step.title : step;
                  const stepDesc = hasStepObjects ? step.description : null;
                  return (
                    <Reveal key={stepTitle} delay={index * 120}>
                      <div className="relative sm:pl-16">
                        <span className="hidden sm:flex absolute left-0 top-5 w-11 h-11 bg-primary-600 text-white rounded-full items-center justify-center font-bold text-lg ring-4 ring-white shadow-lg z-10">
                          {index + 1}
                        </span>
                        <div className="card p-6 md:p-7">
                          <h3 className="font-bold text-slate-900 text-lg flex items-center gap-3">
                            <span className="sm:hidden inline-flex w-8 h-8 shrink-0 bg-primary-600 text-white rounded-full items-center justify-center font-bold text-sm">
                              {index + 1}
                            </span>
                            {stepTitle}
                          </h3>
                          {stepDesc && (
                            <p className="text-slate-600 mt-1.5 leading-relaxed">{stepDesc}</p>
                          )}
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            FAQ ANIMADO
           ══════════════════════════════════════════════════ */}
        <section className="section bg-white">
          <div className="container mx-auto px-4">
            <Reveal className="text-center max-w-2xl mx-auto mb-12">
              <span className="section-eyebrow">Dúvidas frequentes</span>
              <h2 className="section-title mt-5">Tudo o que você precisa saber</h2>
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

        {/* ══════════════════════════════════════════════════
            CTA FINAL — estilo premium com glow orbs
           ══════════════════════════════════════════════════ */}
        <section className="section bg-slate-900 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary-600/20 rounded-full blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-600/20 rounded-full blur-3xl" aria-hidden="true" />

          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="max-w-2xl mx-auto">
              <Reveal>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Pronto para cuidar do seu sorriso?
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <p className="text-slate-300 mt-5 mb-4 text-lg leading-relaxed">
                  Agende sua avaliação com o Dr. Adriano Camillo e descubra o tratamento
                  ideal para o seu caso — sem compromisso.
                </p>
              </Reveal>
              <Reveal delay={150}>
                <div className="flex flex-col sm:flex-row gap-4 mt-2 text-sm text-slate-400 justify-center">
                  <span className="flex items-center gap-2">
                    <MapPin size={18} aria-hidden="true" />
                    {ADDRESS.street}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={18} aria-hidden="true" />
                    Seg a sex, 8h às 18h
                  </span>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <a
                  href={whatsapp(page.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-base md:text-lg mt-8 inline-flex"
                >
                  Agendar Avaliação
                  <ArrowRight size={20} aria-hidden="true" />
                </a>
              </Reveal>
              <Reveal delay={250}>
                <p className="text-slate-500 text-sm mt-6">
                  São Lourenço do Oeste • Chapecó • Pato Branco • Ampére • Realeza • Novo Horizonte
                </p>
              </Reveal>
              <Reveal delay={300}>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-white mt-8 text-sm font-medium transition-colors"
                >
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
