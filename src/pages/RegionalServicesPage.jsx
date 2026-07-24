import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Target,
  Truck,
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

  const services = useMemo(() => {
    if (!city) return [];

    return [
      {
        title: 'HIFU — Ultrassom Microfocado',
        path: '/hifu',
        Icon: Zap,
        description:
          'Tecnologia não invasiva para estímulo de colágeno, firmeza da pele e protocolos faciais e corporais definidos após avaliação.',
        topics: ['Equipamento levado até a região', 'Protocolos personalizados', 'Sem cortes'],
        cta: 'Conhecer o HIFU',
      },
      {
        title: 'Lipo de Papada com HIFU',
        path: getRegionalServicePath('lipo-de-papada-hifu', city),
        Icon: Target,
        description:
          'Protocolo com ultrassom microfocado para auxiliar no contorno da região abaixo do queixo e no estímulo de firmeza.',
        topics: ['Sem cirurgia', 'Contorno mandibular', 'Resultados progressivos'],
        cta: 'Ver tratamento',
      },
      {
        title: 'Locação de Equipamento HIFU',
        path: getRegionalServicePath('aluguel-de-hifu', city),
        Icon: Truck,
        description:
          'Locação do equipamento para clínicas e profissionais, com organização do atendimento e suporte conforme o serviço contratado.',
        topics: ['Equipamento levado até a clínica', 'Atendimento regional', 'Locação para profissionais'],
        cta: 'Conhecer a locação',
      },
    ];
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
          name: `HIFU em ${city.name} — atendimento e locação`,
          description: `Serviços de HIFU para ${city.name} e região, incluindo atendimento com ultrassom microfocado e locação do equipamento para clínicas e profissionais.`,
          url: pageUrl,
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
            itemListElement: services.map((service, index) => ({
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
              name: `HIFU em ${city.name}`,
              item: pageUrl,
            },
          ],
        },
      ],
    };
  }, [city, services]);

  if (!city) return <Navigate to="/servicos" replace />;

  const title = `HIFU em ${city.name} — Atendimento e Locação | Dr. Adriano Camillo`;
  const description = `HIFU em ${city.name} e região. Levamos o equipamento para atendimentos e também realizamos locação para clínicas e profissionais. Fale pelo WhatsApp.`;
  const message = `Olá, Dr. Adriano! Sou de ${city.name} - ${city.state} e gostaria de informações sobre HIFU e locação do equipamento.`;

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
            alt="Equipamento e estrutura do Dr. Adriano Camillo"
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
                  HIFU para {city.name} e região
                </span>

                <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight">
                  HIFU em {city.name}:{' '}
                  <span className="text-emerald-400">atendimento e locação</span>
                </h1>

                <p className="mt-6 text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Levamos o equipamento HIFU até a região para atendimentos programados e também realizamos a locação para clínicas e profissionais.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <a
                    href={whatsapp(message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-base md:text-lg"
                  >
                    <Phone size={20} aria-hidden="true" />
                    Consultar disponibilidade
                  </a>
                  <Link to="/hifu" className="hidden lg:inline-flex btn-outline-light text-base md:text-lg">
                    Como funciona o HIFU
                  </Link>
                </div>

                <p className="mt-6 text-sm text-slate-300 flex items-center justify-center lg:justify-start gap-2">
                  <ShieldCheck size={17} className="text-emerald-400" aria-hidden="true" />
                  Atendimento mediante agenda • Locação para profissionais • Suporte pelo WhatsApp
                </p>
              </div>

              {isDesktop && (
                <React.Suspense fallback={<div className="hidden lg:block min-h-[430px]" aria-hidden="true" />}>
                  <DesktopWhatsAppForm
                    defaultService="Aluguel de Equipamento HIFU (B2B)"
                    defaultCity={city.name}
                    title={`HIFU em ${city.name}`}
                  />
                </React.Suspense>
              )}
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="section-eyebrow">Serviços disponíveis</span>
              <h2 className="section-title mt-5">HIFU para {city.name} e região</h2>
              <p className="section-subtitle mt-5">
                Escolha entre atendimento com o equipamento ou locação para sua clínica. A disponibilidade é confirmada pelo WhatsApp.
              </p>
            </div>

            <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
              {services.map(({ title: serviceTitle, path, Icon, description: serviceDescription, topics, cta }) => (
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
                  >
                    {cta}
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
                    src={images.hifuEquipamento}
                    alt="Equipamento HIFU levado para atendimentos e locação"
                    width="480"
                    height="640"
                    loading="lazy"
                    decoding="async"
                    className="relative w-full h-auto rounded-[2rem] shadow-xl object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-3">
                <span className="section-eyebrow">Como funciona</span>
                <h2 className="section-title mt-5">Organização simples para atendimento ou locação</h2>
                <ol className="mt-8 space-y-5">
                  {[
                    ['1', 'Entre em contato', `Informe que você é de ${city.name} e diga se procura atendimento ou locação do equipamento.`],
                    ['2', 'Confirme a agenda', 'A equipe verifica disponibilidade, formato do serviço e detalhes necessários para o deslocamento.'],
                    ['3', 'Defina o atendimento', 'Para pacientes, é feita a avaliação do protocolo. Para clínicas, são alinhadas as condições da locação.'],
                    ['4', 'Equipamento na região', 'O HIFU é levado conforme o agendamento combinado e as condições do serviço contratado.'],
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

        <section className="section bg-white" style={{ contentVisibility: 'auto', containIntrinsicSize: '600px' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="section-eyebrow">Região atendida</span>
              <h2 className="section-title mt-5">HIFU em outras cidades próximas</h2>
              <p className="section-subtitle mt-5">
                Consulte a página da sua cidade para abrir o WhatsApp com a localização já informada.
              </p>
            </div>

            <nav className="mt-10 max-w-5xl mx-auto flex flex-wrap justify-center gap-3" aria-label="HIFU por cidade">
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
                <Sparkles size={20} aria-hidden="true" />
                HIFU para {city.name} e região
              </span>
              <h2 className="mt-4 text-3xl md:text-5xl font-bold">Consulte agenda e condições de locação</h2>
              <p className="mt-5 text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
                Envie uma mensagem informando sua cidade e se o interesse é em atendimento ou locação do equipamento.
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
