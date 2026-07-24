import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Clock,
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
import { ADDRESS, whatsapp } from '../utils/constants';

const DesktopWhatsAppForm = React.lazy(() => import('../components/DesktopWhatsAppForm'));

const SERVICES = [
  {
    title: 'HIFU — Ultrassom Microfocado',
    path: '/hifu',
    Icon: Zap,
    description:
      'Tecnologia não invasiva para estimular colágeno e auxiliar no cuidado da flacidez facial e corporal, conforme avaliação individual.',
    topics: ['Estímulo de colágeno', 'Contorno facial', 'Sem cortes', 'Retorno rápido à rotina'],
    process: [
      'Avaliação da pele, das áreas de interesse e das expectativas.',
      'Mapeamento das regiões e escolha das ponteiras adequadas.',
      'Aplicação do ultrassom microfocado com parâmetros personalizados.',
      'Orientações e acompanhamento da evolução do colágeno.',
    ],
  },
  {
    title: 'Odontologia Estética',
    path: '/odontologia-estetica',
    Icon: Sparkles,
    description:
      'Planejamento do sorriso com foco em naturalidade, saúde bucal, proporção e função, respeitando as características de cada paciente.',
    topics: ['Clareamento dental', 'Facetas e lentes', 'Planejamento do sorriso', 'Acabamento natural'],
    process: [
      'Conversa sobre o que você deseja melhorar no sorriso.',
      'Avaliação clínica, fotografias e exames quando necessários.',
      'Apresentação das possibilidades, limites e etapas do tratamento.',
      'Execução conservadora e acompanhamento periódico.',
    ],
  },
  {
    title: 'Implantes Dentários',
    path: '/implantes-dentarios',
    Icon: Heart,
    description:
      'Reabilitação de dentes ausentes com planejamento clínico e exames de imagem para recuperar mastigação, estabilidade e estética.',
    topics: ['Dentes fixos', 'Planejamento por imagem', 'Próteses sobre implantes', 'Função mastigatória'],
    process: [
      'Avaliação da saúde bucal e das condições ósseas.',
      'Planejamento da cirurgia e da futura prótese.',
      'Instalação do implante e período de cicatrização indicado.',
      'Confecção e instalação da prótese com acompanhamento.',
    ],
  },
  {
    title: 'Ortodontia',
    path: '/ortodontia',
    Icon: Smile,
    description:
      'Correção do alinhamento dos dentes e da mordida com opções de aparelhos definidas de acordo com a necessidade clínica.',
    topics: ['Aparelho fixo', 'Opções estéticas', 'Correção da mordida', 'Contenção e acompanhamento'],
    process: [
      'Avaliação clínica e documentação ortodôntica.',
      'Definição dos objetivos e do plano de tratamento.',
      'Instalação do aparelho indicado para o caso.',
      'Consultas de acompanhamento, finalização e contenção.',
    ],
  },
  {
    title: 'Harmonização Orofacial',
    path: '/harmonizacao-orofacial',
    Icon: Syringe,
    description:
      'Procedimentos planejados para equilibrar proporções faciais e suavizar sinais do tempo, preservando a identidade e a naturalidade.',
    topics: ['Toxina botulínica', 'Preenchimento', 'Bioestimuladores', 'Planejamento facial'],
    process: [
      'Análise facial e conversa sobre expectativas.',
      'Definição das áreas e dos procedimentos indicados.',
      'Aplicação em consultório com técnica individualizada.',
      'Orientações pós-procedimento e reavaliação.',
    ],
  },
  {
    title: 'DTM e Dor Orofacial',
    path: '/dtm-dor-orofacial',
    Icon: Stethoscope,
    description:
      'Investigação de dores na face, mandíbula e articulação, estalos, limitação de abertura e sinais relacionados ao bruxismo.',
    topics: ['Dor na ATM', 'Bruxismo', 'Estalos na mandíbula', 'Avaliação funcional'],
    process: [
      'Escuta detalhada dos sintomas, hábitos e histórico.',
      'Avaliação dos músculos, da mordida e da articulação.',
      'Definição da conduta e das orientações adequadas.',
      'Acompanhamento da resposta e ajustes quando necessários.',
    ],
  },
  {
    title: 'Ozonioterapia Odontológica',
    path: '/ozonioterapia',
    Icon: FlaskConical,
    description:
      'Terapia complementar utilizada em protocolos odontológicos selecionados para auxiliar no cuidado dos tecidos e na recuperação.',
    topics: ['Terapia complementar', 'Protocolos clínicos', 'Pós-operatório', 'Aplicação em consultório'],
    process: [
      'Avaliação da indicação dentro do tratamento principal.',
      'Escolha do protocolo e da forma de aplicação.',
      'Aplicação controlada em consultório.',
      'Reavaliação da evolução clínica.',
    ],
  },
  {
    title: 'Lipo de Papada com HIFU',
    path: '/lipo-de-papada-hifu',
    Icon: Target,
    description:
      'Protocolo não cirúrgico com ultrassom microfocado para auxiliar na definição da região abaixo do queixo e no estímulo de firmeza.',
    topics: ['Sem cirurgia', 'Contorno mandibular', 'Estímulo de firmeza', 'Sessão personalizada'],
    process: [
      'Avaliação da papada, da pele e da indicação do procedimento.',
      'Marcação das áreas e seleção das profundidades de trabalho.',
      'Aplicação do HIFU com parâmetros individualizados.',
      'Orientações e acompanhamento dos resultados progressivos.',
    ],
  },
];

const FAQS = [
  {
    question: 'Como saber qual tratamento é indicado para mim?',
    answer:
      'A indicação depende da avaliação clínica, do seu histórico de saúde e dos seus objetivos. Durante a consulta, o Dr. Adriano explica as alternativas, benefícios, limitações e etapas antes de qualquer decisão.',
  },
  {
    question: 'Posso agendar diretamente pelo WhatsApp?',
    answer:
      'Sim. No celular, toque no botão do WhatsApp. No computador, você também pode preencher o formulário para abrir a conversa com as informações iniciais já organizadas.',
  },
  {
    question: 'O consultório atende pacientes de outras cidades?',
    answer:
      'Sim. O consultório fica em São Lourenço do Oeste e recebe pacientes da região. Ao entrar em contato, informe sua cidade para facilitar a organização do atendimento.',
  },
  {
    question: 'Os resultados são iguais para todas as pessoas?',
    answer:
      'Não. Resultados, duração e número de sessões variam conforme o quadro clínico, os hábitos e a resposta individual. A avaliação é essencial para alinhar expectativas com segurança.',
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

const ServicesPage = () => {
  const isDesktop = useDesktopViewport();

  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': 'https://dradrianocamillo.com/servicos#pagina',
          name: 'Serviços do Dr. Adriano Camillo',
          description:
            'Tratamentos odontológicos e de estética facial em São Lourenço do Oeste, com planejamento individual e atendimento humanizado.',
          url: 'https://dradrianocamillo.com/servicos',
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: SERVICES.map((service, index) => ({
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
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: FAQS.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        },
      ],
    }),
    []
  );

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="Serviços Odontológicos em São Lourenço do Oeste | Dr. Adriano Camillo"
        description="Conheça os serviços do Dr. Adriano Camillo em São Lourenço do Oeste: HIFU, implantes, ortodontia, estética, harmonização, DTM e ozonioterapia."
        path="/servicos"
        jsonLd={jsonLd}
      />
      <Header />

      <main>
        <section className="relative min-h-[78svh] flex items-center overflow-hidden bg-slate-950">
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
                  <ShieldCheck size={17} aria-hidden="true" />
                  Odontologia e estética facial em São Lourenço do Oeste
                </span>

                <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight">
                  Serviços pensados para sua{' '}
                  <span className="text-emerald-400">saúde, sorriso e autoestima</span>
                </h1>

                <p className="mt-6 text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Conheça os tratamentos realizados pelo Dr. Adriano Camillo, entenda como cada um funciona e encontre o cuidado mais adequado para o seu momento.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <a
                    href={whatsapp('Olá, Dr. Adriano! Vim pela página de serviços e gostaria de agendar uma avaliação.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-base md:text-lg"
                  >
                    <Phone size={20} aria-hidden="true" />
                    Falar no WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => document.getElementById('tratamentos')?.scrollIntoView({ behavior: 'smooth' })}
                    className="hidden lg:inline-flex btn-outline-light text-base md:text-lg"
                  >
                    Ver todos os tratamentos
                  </button>
                </div>

                <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-sm text-slate-300">
                  <span className="inline-flex items-center gap-2">
                    <Clock size={17} className="text-emerald-400" aria-hidden="true" />
                    Atendimento com hora marcada
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin size={17} className="text-emerald-400" aria-hidden="true" />
                    {ADDRESS.city} — {ADDRESS.state}
                  </span>
                </div>
              </div>

              {isDesktop && (
                <React.Suspense fallback={<div className="hidden lg:block min-h-[430px]" aria-hidden="true" />}>
                  <DesktopWhatsAppForm title="Agende sua avaliação" />
                </React.Suspense>
              )}
            </div>
          </div>
        </section>

        <section id="tratamentos" className="section bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="section-eyebrow">Tratamentos e especialidades</span>
              <h2 className="section-title mt-5">Encontre o serviço que você procura</h2>
              <p className="section-subtitle mt-5">
                Cada atendimento começa por uma avaliação individual. Abaixo, você encontra um resumo e pode acessar a página completa de cada tratamento.
              </p>
            </div>

            <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {SERVICES.map(({ title, path, Icon, description, topics }) => (
                <article key={path} className="card card-lift p-6 md:p-7 flex flex-col">
                  <span className="inline-flex self-start p-3.5 rounded-2xl bg-primary-50 text-primary-700">
                    <Icon size={28} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-slate-900">{title}</h3>
                  <p className="mt-3 text-sm md:text-base text-slate-600 leading-relaxed">{description}</p>
                  <ul className="mt-5 space-y-2 flex-1">
                    {topics.slice(0, 3).map((topic) => (
                      <li key={topic} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle size={17} className="mt-0.5 shrink-0 text-emerald-600" aria-hidden="true" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={path}
                    className="mt-6 inline-flex items-center gap-2 text-primary-700 font-semibold hover:gap-3 transition-all"
                    aria-label={`Ver detalhes sobre ${title}`}
                  >
                    Ver detalhes
                    <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-slate-50" style={{ contentVisibility: 'auto', containIntrinsicSize: '700px' }}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-center">
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
                <span className="section-eyebrow">Como funciona o atendimento</span>
                <h2 className="section-title mt-5">Clareza em cada etapa, do primeiro contato ao acompanhamento</h2>
                <p className="section-subtitle mt-5">
                  O objetivo é que você compreenda o diagnóstico, as alternativas e o planejamento antes de iniciar qualquer procedimento.
                </p>

                <ol className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    ['1', 'Primeiro contato', 'Você explica sua necessidade pelo WhatsApp e escolhe o melhor horário disponível.'],
                    ['2', 'Avaliação individual', 'O Dr. Adriano analisa seu caso, histórico, objetivos e exames necessários.'],
                    ['3', 'Plano de tratamento', 'Você recebe uma explicação clara sobre opções, etapas, cuidados e expectativas.'],
                    ['4', 'Tratamento e acompanhamento', 'O procedimento é realizado com orientações e retornos definidos para acompanhar a evolução.'],
                  ].map(([number, title, text]) => (
                    <li key={number} className="card p-6 flex items-start gap-4">
                      <span className="w-10 h-10 shrink-0 rounded-full bg-primary-700 text-white flex items-center justify-center font-bold">
                        {number}
                      </span>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">{title}</h3>
                        <p className="mt-2 text-slate-600 leading-relaxed">{text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-white" style={{ contentVisibility: 'auto', containIntrinsicSize: '1400px' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="section-eyebrow">Entenda cada tratamento</span>
              <h2 className="section-title mt-5">O que é feito e como funciona</h2>
              <p className="section-subtitle mt-5">
                Estes tópicos são informativos. A indicação, a sequência e o número de sessões são definidos somente após avaliação clínica.
              </p>
            </div>

            <div className="mt-12 md:mt-16 max-w-6xl mx-auto space-y-6">
              {SERVICES.map(({ title, path, Icon, description, topics, process }, index) => (
                <article
                  key={`${path}-detalhes`}
                  className={`rounded-3xl border p-6 md:p-8 lg:p-10 ${
                    index % 2 === 0 ? 'bg-slate-50 border-slate-100' : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                    <div className="lg:col-span-2">
                      <span className="inline-flex p-3.5 rounded-2xl bg-primary-50 text-primary-700">
                        <Icon size={30} aria-hidden="true" />
                      </span>
                      <h3 className="mt-5 text-2xl md:text-3xl font-bold text-slate-900">{title}</h3>
                      <p className="mt-4 text-slate-600 leading-relaxed md:text-lg">{description}</p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {topics.map((topic) => (
                          <span key={topic} className="rounded-full bg-white border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-3">
                      <h4 className="text-lg font-bold text-slate-900">Como funciona</h4>
                      <ol className="mt-5 space-y-4">
                        {process.map((step, stepIndex) => (
                          <li key={step} className="flex items-start gap-4">
                            <span className="w-8 h-8 shrink-0 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-bold">
                              {stepIndex + 1}
                            </span>
                            <span className="pt-1 text-slate-700 leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>
                      <div className="mt-7 flex flex-col sm:flex-row gap-3">
                        <Link to={path} className="btn-dark text-sm md:text-base">
                          Página completa
                          <ArrowRight size={18} aria-hidden="true" />
                        </Link>
                        <a
                          href={whatsapp(`Olá, Dr. Adriano! Gostaria de saber mais sobre ${title}.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary text-sm md:text-base"
                        >
                          <Phone size={18} aria-hidden="true" />
                          Tirar dúvidas
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-slate-950 text-white" style={{ contentVisibility: 'auto', containIntrinsicSize: '500px' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto rounded-[2rem] border border-white/10 bg-white/5 p-7 md:p-10 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <span className="inline-flex items-center gap-2 text-emerald-400 font-semibold">
                    <ShieldCheck size={20} aria-hidden="true" />
                    Serviço para profissionais e clínicas
                  </span>
                  <h2 className="mt-4 text-3xl md:text-4xl font-bold">Locação de equipamento HIFU</h2>
                  <p className="mt-4 text-slate-300 text-lg leading-relaxed max-w-3xl">
                    Solução para clínicas que desejam oferecer tecnologia HIFU com equipamento, orientação operacional e organização do atendimento.
                  </p>
                </div>
                <div className="flex lg:justify-end">
                  <Link to="/aluguel-de-hifu" className="btn-primary w-full sm:w-auto">
                    Conhecer a locação
                    <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-slate-50" style={{ contentVisibility: 'auto', containIntrinsicSize: '650px' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="section-eyebrow">Dúvidas frequentes</span>
              <h2 className="section-title mt-5">Antes de agendar</h2>
            </div>

            <div className="mt-10 max-w-3xl mx-auto space-y-4">
              {FAQS.map((faq) => (
                <details key={faq.question} className="group card overflow-hidden">
                  <summary className="list-none cursor-pointer flex items-center justify-between gap-4 p-5 md:p-6 font-bold text-slate-900 md:text-lg">
                    {faq.question}
                    <ChevronDown
                      size={22}
                      className="shrink-0 text-primary-700 transition-transform duration-300 group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="px-5 md:px-6 pb-5 md:pb-6 text-slate-600 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center rounded-[2rem] bg-gradient-to-br from-primary-700 to-slate-900 px-6 py-12 md:px-12 md:py-16 text-white shadow-2xl">
              <span className="inline-flex items-center gap-2 text-emerald-300 font-semibold">
                <CheckCircle size={20} aria-hidden="true" />
                Atendimento personalizado
              </span>
              <h2 className="mt-4 text-3xl md:text-5xl font-bold">Converse com o Dr. Adriano sobre o seu caso</h2>
              <p className="mt-5 text-slate-200 text-lg max-w-2xl mx-auto leading-relaxed">
                Envie uma mensagem, conte o que você procura e receba orientação para agendar a avaliação adequada.
              </p>
              <a
                href={whatsapp('Olá, Dr. Adriano! Gostaria de conversar sobre os tratamentos e agendar uma avaliação.')}
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

export default ServicesPage;
