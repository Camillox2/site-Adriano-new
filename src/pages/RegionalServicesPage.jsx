import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  FlaskConical,
  Heart,
  MapPin,
  Phone,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
  Syringe,
  Target,
  Zap,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import Seo from '../components/Seo';
import { images } from '../assets';
import { whatsapp } from '../utils/constants';
import {
  REGIONAL_SERVICE_CITIES,
  REGIONAL_SERVICE_CITY_LIST,
  getRegionalServicePath,
} from '../data/regionalServiceCities';

const DesktopWhatsAppForm = React.lazy(() => import('../components/DesktopWhatsAppForm'));

const SERVICES = [
  {
    title: 'HIFU — Ultrassom Microfocado',
    baseSlug: null,
    path: '/hifu',
    Icon: Zap,
    description:
      'Tecnologia não invasiva para estimular colágeno e auxiliar no cuidado da flacidez facial e corporal.',
    topics: ['Estímulo de colágeno', 'Contorno facial', 'Sem cortes'],
  },
  {
    title: 'Odontologia Estética',
    baseSlug: 'odontologia-estetica',
    Icon: Sparkles,
    description:
      'Planejamento do sorriso com foco em naturalidade, saúde bucal, proporção e função.',
    topics: ['Clareamento', 'Facetas e lentes', 'Planejamento do sorriso'],
  },
  {
    title: 'Implantes Dentários',
    baseSlug: 'implantes-dentarios',
    Icon: Heart,
    description:
      'Reabilitação de dentes ausentes para recuperar mastigação, estabilidade e estética.',
    topics: ['Dentes fixos', 'Exames de imagem', 'Próteses sobre implantes'],
  },
  {
    title: 'Ortodontia',
    baseSlug: 'ortodontia',
    Icon: Smile,
    description:
      'Correção do alinhamento dos dentes e da mordida com opções definidas para cada caso.',
    topics: ['Aparelho fixo', 'Opções estéticas', 'Correção da mordida'],
  },
  {
    title: 'Harmonização Orofacial',
    baseSlug: 'harmonizacao-orofacial',
    Icon: Syringe,
    description:
      'Procedimentos planejados para equilibrar proporções faciais e preservar a naturalidade.',
    topics: ['Toxina botulínica', 'Preenchimento', 'Bioestimuladores'],
  },
  {
    title: 'DTM e Dor Orofacial',
    baseSlug: 'dtm-dor-orofacial',
    Icon: Stethoscope,
    description:
      'Avaliação de dores na face, mandíbula, articulação, estalos e sinais de bruxismo.',
    topics: ['Dor na ATM', 'Bruxismo', 'Avaliação funcional'],
  },
  {
    title: 'Ozonioterapia Odontológica',
    baseSlug: 'ozonioterapia',
    Icon: FlaskConical,
    description:
      'Terapia complementar utilizada em protocolos odontológicos selecionados.',
    topics: ['Terapia complementar', 'Pós-operatório', 'Aplicação em consultório'],
  },
  {
    title: 'Lipo de Papada com HIFU',
    baseSlug: 'lipo-de-papada-hifu',
    Icon: Target,
    description:
      'Protocolo não cirúrgico para auxiliar no contorno abaixo do queixo e no estímulo de firmeza.',
    topics: ['Sem cirurgia', 'Contorno mandibular', 'Firmeza da pele'],
  },
];

const useDesktopViewport = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);

  return isDesktop;
};

const RegionalServicesPage = () => {
  const { citySlug } = useParams();
  const city = REGIONAL_SERVICE_CITIES[citySlug];
  const isDesktop = useDesktopViewport();

  const serviceItems = useMemo(() => {
    if (!city) return [];
    return SERVICES.map((service) => ({
      ...service,
      path: service.baseSlug ? getRegionalServicePath(service.baseSlug, city) : service.path,
    }));
  }, [city]);

  const jsonLd = useMemo(() => {
    if (!city) return null;
    const pageUrl = `https://dradrianocamillo.com/servicos/${city.slug}`;

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': `${pageUrl}#pagina`,
          name: `Serviços odontológicos ${city.titleLocation}`,
          description: city.intro,
          url: pageUrl,
          about: {
            '@type': 'Dentist',
            '@id': 'https://dradrianocamillo.com/#clinica',
          },
          areaServed: {
            '@type': 'City',
            name: city.name,
            address: {
              '@type': 'PostalAddress',
              addressRegion: city.state,
              addressCountry: 'BR',
            },
          },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: serviceItems.map((service, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: service.title,
              url: `https://dradrianocamillo.com${service.path}`,
            })),
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Início',
              item: 'https://dradrianocamillo.com/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Serviços',
              item: 'https://dradrianocamillo.com/servicos',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: city.name,
              item: pageUrl,
            },
          ],
        },
      ],
    };
  }, [city, serviceItems]);

  if (!city) return <Navigate to="/servicos" replace />;

  const title = `Serviços Odontológicos ${city.titleLocation} | Dr. Adriano Camillo`;
  const description = `${city.intro} Conheça HIFU, implantes, ortodontia, estética, harmonização, DTM e ozonioterapia.`;
  const message = `Olá, Dr. Adriano! Sou de ${city.name} - ${city.state}, vi a página de serviços e gostaria de agendar uma avaliação.`;

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title={title}
        description={description}
        path={`/servicos/${city.slug}`}
        jsonLd={jsonLd}
      />
      <Header />

      <main>
        <section className="relative min-h-[76svh] flex items-center overflow-hidden bg-slate-950">
          <img
            src={images.consultorio1}
            alt="Consultório do Dr. Adriano Camillo em São Lourenço do Oeste"
            width="1920"
            height="1080"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/88 to-slate-900/65" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />

          <div className="container mx-auto px-4 relative z-10 pt-28 pb-16 lg:pt-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="text-white text-center lg:text-left max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-emerald-300 backdrop-blur-sm">
                  <MapPin size={17} aria-hidden="true" />
                  {city.badge}
                </span>

                <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight">
                  Serviços odontológicos{' '}
                  <span className="text-emerald-400">{city.titleLocation}</span>
                </h1>

                <p className="mt-6 text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {city.intro}
                </p>

                {!city.isPrimary && (
                  <p className="mt-4 text-sm md:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0">
                    O atendimento clínico é realizado em São Lourenço do Oeste — SC. Pelo WhatsApp, você pode tirar dúvidas e organizar a avaliação antes do deslocamento.
                  </p>
                )}

                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <a
                    href={whatsapp(message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-base md:text-lg"
                  >
                    <Phone size={20} aria-hidden="true" />
                    Falar no WhatsApp
                  </a>
                  <Link to="/servicos" className="hidden lg:inline-flex btn-outline-light text-base md:text-lg">
                    Página geral de serviços
                  </Link>
                </div>

                <p className="mt-6 text-sm text-slate-300 flex items-center justify-center lg:justify-start gap-2">
                  <ShieldCheck size={17} className="text-emerald-400" aria-hidden="true" />
                  Avaliação individual • Orientações claras • Atendimento com hora marcada
                </p>
              </div>

              {isDesktop && (
                <React.Suspense fallback={<div className="hidden lg:block min-h-[430px]" aria-hidden="true" />}>
                  <DesktopWhatsAppForm
                    defaultCity={city.name}
                    title={`Agendar para ${city.name}`}
                  />
                </React.Suspense>
              )}
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="section-eyebrow">Tratamentos disponíveis</span>
              <h2 className="section-title mt-5">
                Conheça os serviços para pacientes de {city.name}
              </h2>
              <p className="section-subtitle mt-5">
                Cada tratamento depende de avaliação clínica. Acesse a página completa para entender benefícios, etapas, cuidados e dúvidas frequentes.
              </p>
            </div>

            <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {serviceItems.map(({ title: serviceTitle, path, Icon, description: serviceDescription, topics }) => (
                <article key={path} className="card card-lift p-6 md:p-7 flex flex-col">
                  <span className="inline-flex self-start p-3.5 rounded-2xl bg-primary-50 text-primary-700">
                    <Icon size={28} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-slate-900">{serviceTitle}</h3>
                  <p className="mt-3 text-sm md:text-base text-slate-600 leading-relaxed">
                    {serviceDescription}
                  </p>
                  <ul className="mt-5 space-y-2 flex-1">
                    {topics.map((topic) => (
                      <li key={topic} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle size={17} className="mt-0.5 shrink-0 text-emerald-600" aria-hidden="true" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={path}
                    className="mt-6 inline-flex items-center gap-2 text-primary-700 font-semibold hover:gap-3 transition-all"
                    aria-label={`Ver ${serviceTitle} para pacientes de ${city.name}`}
                  >
                    Ver detalhes
                    <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-slate-50" style={{ contentVisibility: 'auto', containIntrinsicSize: '650px' }}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
              <div className="lg:col-span-2">
                <div className="relative max-w-md mx-auto">
                  <div className="absolute -inset-3 bg-gradient-to-tr from-primary-200 to-emerald-200 rounded-[2rem] blur-xl opacity-70" aria-hidden="true" />
                  <img
                    src={images.drAdriano}
                    alt="Dr. Adriano Camillo, cirurgião-dentista"
                    width="480"
                    height="480"
                    loading="lazy"
                    decoding="async"
                    className="relative w-full h-auto rounded-[2rem] shadow-xl object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-3">
                <span className="section-eyebrow">Como funciona</span>
                <h2 className="section-title mt-5">Do primeiro contato ao acompanhamento</h2>
                <ol className="mt-8 space-y-5">
                  {[
                    ['1', 'Converse pelo WhatsApp', `Informe que você é de ${city.name}, explique sua necessidade e tire as primeiras dúvidas.`],
                    ['2', 'Agende a avaliação', 'A equipe ajuda a escolher o horário e orienta sobre exames ou informações importantes.'],
                    ['3', 'Receba o planejamento', 'Após a avaliação clínica, o Dr. Adriano apresenta as opções, etapas e cuidados indicados.'],
                    ['4', 'Realize o tratamento', 'O atendimento é acompanhado de orientações e retornos definidos de acordo com o caso.'],
                  ].map(([number, stepTitle, text]) => (
                    <li key={number} className="card p-5 md:p-6 flex items-start gap-4">
                      <span className="w-10 h-10 shrink-0 rounded-full bg-primary-700 text-white flex items-center justify-center font-bold">
                        {number}
                      </span>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">{stepTitle}</h3>
                        <p className="mt-2 text-slate-600 leading-relaxed">{text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-white" style={{ contentVisibility: 'auto', containIntrinsicSize: '650px' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="section-eyebrow">Cidades da região</span>
              <h2 className="section-title mt-5">Veja a página de serviços da sua cidade</h2>
              <p className="section-subtitle mt-5">
                Criamos páginas específicas para facilitar a consulta dos tratamentos e o contato de pacientes da região.
              </p>
            </div>

            <nav className="mt-10 max-w-5xl mx-auto flex flex-wrap justify-center gap-3" aria-label="Serviços por cidade">
              {REGIONAL_SERVICE_CITY_LIST.map((regionalCity) => (
                <Link
                  key={regionalCity.slug}
                  to={`/servicos/${regionalCity.slug}`}
                  aria-current={regionalCity.slug === city.slug ? 'page' : undefined}
                  className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
                    regionalCity.slug === city.slug
                      ? 'bg-primary-700 border-primary-700 text-white'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-primary-300 hover:text-primary-700'
                  }`}
                >
                  {regionalCity.name} — {regionalCity.state}
                </Link>
              ))}
            </nav>
          </div>
        </section>

        <section className="section bg-slate-950 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center rounded-[2rem] border border-white/10 bg-white/5 px-6 py-12 md:px-12 md:py-16">
              <span className="inline-flex items-center gap-2 text-emerald-400 font-semibold">
                <ShieldCheck size={20} aria-hidden="true" />
                Atendimento para {city.name} e região
              </span>
              <h2 className="mt-4 text-3xl md:text-5xl font-bold">Converse sobre o seu caso</h2>
              <p className="mt-5 text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
                Envie uma mensagem, informe sua cidade e receba orientação para organizar a avaliação no consultório.
              </p>
              <a
                href={whatsapp(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 btn-primary text-base md:text-lg"
              >
                <Phone size={20} aria-hidden="true" />
                Chamar no WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default RegionalServicesPage;
