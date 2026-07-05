import React, { useState, useCallback } from 'react';
import {
  CheckCircle,
  ChevronDown,
  Play,
  Zap,
  Target,
  Timer,
  TrendingUp,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import Seo from '../components/Seo';
import { HIFU_VIDEOS, VideoModal } from '../components/HifuSection';
import { images } from '../assets';
import { WHATSAPP_HIFU } from '../utils/constants';

// ---------- conteúdo ----------
const BENEFITS = [
  {
    Icon: Target,
    title: 'Precisão milimétrica',
    description:
      'A energia do ultrassom é focada em profundidades exatas da pele, tratando inclusive a camada SMAS — a mesma abordada no lifting cirúrgico.',
  },
  {
    Icon: TrendingUp,
    title: 'Resultados progressivos',
    description:
      'O colágeno novo é produzido gradualmente: a melhora aparece nas primeiras semanas e evolui por até 6 meses após a sessão.',
  },
  {
    Icon: ShieldCheck,
    title: 'Segurança comprovada',
    description:
      'Tecnologia não invasiva consolidada mundialmente, realizada em consultório por profissional habilitado.',
  },
  {
    Icon: Timer,
    title: 'Sem afastamento',
    description:
      'Você retorna às suas atividades no mesmo dia. Sem cortes, sem agulhas, sem internação e sem curativos.',
  },
  {
    Icon: Zap,
    title: 'Sessão única',
    description:
      'Na maioria dos casos, uma única sessão é suficiente — com manutenção opcional após 12 a 18 meses.',
  },
  {
    Icon: HeartHandshake,
    title: 'Conforto no tratamento',
    description:
      'Procedimento bem tolerado pela maioria dos pacientes, sem necessidade de anestesia geral.',
  },
];

const AREAS = [
  'Face completa (terço médio e inferior)',
  'Região da papada e contorno mandibular',
  'Pescoço e flacidez cervical',
  'Sobrancelhas e região periocular',
];

const STEPS = [
  {
    title: 'Avaliação personalizada',
    description:
      'O Dr. Adriano analisa sua pele, o grau de flacidez e seus objetivos para definir se o HIFU é indicado e montar o plano de tratamento.',
  },
  {
    title: 'Preparação da pele',
    description:
      'Higienização completa e demarcação das áreas que serão tratadas, com aplicação do gel condutor.',
  },
  {
    title: 'Aplicação do ultrassom',
    description:
      'A ponteira emite os feixes de ultrassom microfocado nas profundidades planejadas. A sessão dura, em média, de 45 a 90 minutos.',
  },
  {
    title: 'Orientações pós-procedimento',
    description:
      'Você recebe orientações simples de cuidados — protetor solar e hidratação — e já pode retomar a rotina normalmente.',
  },
  {
    title: 'Acompanhamento dos resultados',
    description:
      'O acompanhamento garante que a evolução do colágeno siga o esperado, com registro da transformação ao longo dos meses.',
  },
];

const FAQS = [
  {
    question: 'O que é HIFU (Ultrassom Microfocado)?',
    answer:
      'HIFU é a sigla de High Intensity Focused Ultrasound — ultrassom focado de alta intensidade. É uma tecnologia não invasiva que concentra energia em pontos precisos das camadas profundas da pele, provocando a contração imediata das fibras e estimulando a produção de colágeno novo. O resultado é um efeito lifting sem cirurgia.',
  },
  {
    question: 'Para quem o HIFU é indicado?',
    answer:
      'É indicado principalmente para pessoas a partir dos 30 anos com flacidez leve a moderada na face, papada ou pescoço, que desejam rejuvenescer sem cirurgia. A avaliação profissional define se o HIFU é a melhor opção para o seu caso.',
  },
  {
    question: 'Quando os resultados aparecem?',
    answer:
      'Há um efeito tensor discreto já nos primeiros dias, mas o principal resultado vem da produção de colágeno novo: a melhora se torna visível a partir de 30 dias e evolui progressivamente por até 6 meses após a sessão.',
  },
  {
    question: 'O procedimento dói?',
    answer:
      'A maioria dos pacientes sente apenas pontadas leves ou calor durante a aplicação, bem tolerados. Não é necessária anestesia geral e o desconforto termina junto com a sessão.',
  },
  {
    question: 'Quantas sessões são necessárias?',
    answer:
      'Na maioria dos casos, uma única sessão é suficiente. Dependendo do grau de flacidez, pode ser recomendada uma sessão de manutenção após 12 a 18 meses.',
  },
  {
    question: 'Quais os cuidados após o HIFU?',
    answer:
      'Os cuidados são simples: usar protetor solar diariamente, manter a pele hidratada e evitar exposição solar intensa nos primeiros dias. Não há restrição para atividades do dia a dia.',
  },
  {
    question: 'HIFU substitui a cirurgia plástica?',
    answer:
      'O HIFU trata flacidez leve a moderada com excelentes resultados, mas não substitui um lifting cirúrgico em casos de flacidez acentuada. Na avaliação, o Dr. Adriano indica com transparência o tratamento mais adequado ao seu caso.',
  },
];

// JSON-LD FAQPage para os resultados do Google
const FAQ_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

// ---------- componentes ----------
const FaqItem = ({ faq, open, onToggle }) => (
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
);

const HifuDetails = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);
  const closeVideo = useCallback(() => setActiveVideo(null), []);

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="HIFU em São Lourenço do Oeste — Ultrassom Microfocado | Dr. Adriano Camillo"
        description="Lifting facial sem cirurgia com HIFU (Ultrassom Microfocado) em São Lourenço do Oeste - SC. Trata flacidez, papada e contorno facial estimulando o colágeno. Veja vídeos, benefícios e agende sua avaliação."
        path="/hifu"
        jsonLd={FAQ_JSONLD}
      />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-slate-900 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25"
            style={{ backgroundImage: `url(${images.hifuEquipamentoDois})` }}
            aria-hidden="true"
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/80 to-slate-900"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-medium text-emerald-300 mb-6">
                <Zap size={15} aria-hidden="true" />
                Ultrassom Microfocado
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                HIFU: o lifting facial{' '}
                <span className="text-emerald-400">sem cirurgia</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mt-6 leading-relaxed">
                Firmeza, contorno e rejuvenescimento estimulando o colágeno da
                sua própria pele — sem cortes, sem agulhas e sem afastamento da
                rotina.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-8">
                <a
                  href={WHATSAPP_HIFU}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-base md:text-lg"
                >
                  Agendar Avaliação HIFU
                </a>
                <button
                  onClick={() =>
                    document.getElementById('videos-hifu')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="btn-outline-light text-base md:text-lg"
                >
                  <Play size={18} aria-hidden="true" />
                  Ver vídeos
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* O que é */}
        <section className="section bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <span className="section-eyebrow">Entenda a tecnologia</span>
                <h2 className="section-title mt-5">O que é o Ultrassom Microfocado?</h2>
                <p className="text-slate-600 leading-relaxed md:text-lg mt-6">
                  O HIFU (High Intensity Focused Ultrasound) utiliza feixes de
                  ultrassom concentrados em pontos precisos sob a pele. Essa
                  energia aquece de forma controlada as camadas profundas —
                  inclusive o SMAS, a estrutura tratada em um lifting cirúrgico —
                  provocando dois efeitos:
                </p>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-emerald-600 shrink-0 mt-1" size={22} aria-hidden="true" />
                    <span className="text-slate-700 md:text-lg">
                      <strong>Efeito imediato:</strong> contração das fibras de
                      colágeno existentes, com sensação de pele mais firme.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-emerald-600 shrink-0 mt-1" size={22} aria-hidden="true" />
                    <span className="text-slate-700 md:text-lg">
                      <strong>Efeito progressivo:</strong> estímulo à produção de
                      colágeno novo, que firma e redefine o contorno facial ao
                      longo dos meses.
                    </span>
                  </li>
                </ul>

                <div className="mt-8 bg-slate-50 border border-slate-100 rounded-2xl p-6">
                  <h3 className="font-bold text-slate-900 mb-3">Áreas tratadas</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {AREAS.map((area) => (
                      <li key={area} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle size={17} className="text-primary-700 shrink-0 mt-0.5" aria-hidden="true" />
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="relative">
                <img
                  src={images.hifuEquipamento}
                  alt="Dr. Adriano Camillo segurando a ponteira do equipamento Ultramed HIFU"
                  loading="lazy"
                  width="720"
                  height="960"
                  className="rounded-3xl shadow-2xl w-full object-cover max-h-[36rem] object-top"
                />
                <div className="absolute -bottom-5 left-6 right-6 sm:left-10 sm:right-10 bg-white shadow-xl rounded-2xl px-6 py-4 flex items-center gap-4 border border-slate-100">
                  <ShieldCheck className="text-emerald-600 shrink-0" size={30} aria-hidden="true" />
                  <p className="text-sm text-slate-700 leading-snug">
                    <strong className="text-slate-900">Equipamento Ultramed HIFU</strong>
                    <br />
                    aplicado pessoalmente pelo Dr. Adriano Camillo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="section bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="section-eyebrow">Benefícios</span>
              <h2 className="section-title mt-5">Por que o HIFU conquistou o mundo</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {BENEFITS.map(({ Icon, title, description }) => (
                <div key={title} className="card card-lift p-7">
                  <span className="inline-flex p-3 rounded-2xl bg-primary-50 text-primary-700 mb-4">
                    <Icon size={26} aria-hidden="true" />
                  </span>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vídeos */}
        <section id="videos-hifu" className="section bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="section-eyebrow">Transparência total</span>
              <h2 className="section-title mt-5">Veja o procedimento de perto</h2>
              <p className="section-subtitle mt-5">
                Vídeos reais gravados no consultório — sem edição exagerada, do
                jeito que acontece na prática.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {HIFU_VIDEOS.map((video) => (
                <button
                  key={video.id}
                  onClick={() => setActiveVideo(video)}
                  className="card card-lift group overflow-hidden text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-300"
                  aria-label={`Assistir: ${video.title}`}
                >
                  <div className="relative">
                    <img
                      src={video.poster}
                      alt={video.title}
                      loading="lazy"
                      width="640"
                      height="360"
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-white/95 rounded-full p-3 shadow-lg group-hover:bg-primary-600 group-hover:scale-110 transition-all">
                        <Play className="text-primary-700 group-hover:text-white" size={22} fill="currentColor" aria-hidden="true" />
                      </span>
                    </div>
                    <span className="absolute top-3 right-3 bg-slate-900/80 text-white px-2.5 py-1 rounded-full text-xs font-medium">
                      {video.duration}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-primary-700 transition-colors">
                      {video.title}
                    </h3>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Etapas */}
        <section className="section bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="section-eyebrow">Passo a passo</span>
              <h2 className="section-title mt-5">Como funciona o tratamento</h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {STEPS.map((step, index) => (
                <div key={step.title} className="card p-6 md:p-7 flex items-start gap-5">
                  <span className="w-11 h-11 shrink-0 bg-primary-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{step.title}</h3>
                    <p className="text-slate-600 mt-1.5 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="section-eyebrow">Dúvidas frequentes</span>
              <h2 className="section-title mt-5">Tudo o que você precisa saber</h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {FAQS.map((faq, index) => (
                <FaqItem
                  key={faq.question}
                  faq={faq}
                  open={openFaq === index}
                  onToggle={() => setOpenFaq(openFaq === index ? -1 : index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="section bg-slate-900 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary-600/20 rounded-full blur-3xl" aria-hidden="true"></div>
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-600/20 rounded-full blur-3xl" aria-hidden="true"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Pronto para ver sua melhor versão no espelho?
              </h2>
              <p className="text-slate-300 mt-5 mb-9 text-lg leading-relaxed">
                Agende sua avaliação com o Dr. Adriano Camillo e descubra o que o
                Ultrassom Microfocado pode fazer por você — sem compromisso.
              </p>
              <a
                href={WHATSAPP_HIFU}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base md:text-lg"
              >
                Agendar Avaliação HIFU
                <ArrowRight size={20} aria-hidden="true" />
              </a>
              <p className="text-slate-400 text-sm mt-6">
                São Lourenço do Oeste • Realeza • Ampére • Curitiba
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />

      {activeVideo && <VideoModal video={activeVideo} onClose={closeVideo} />}
    </div>
  );
};

export default HifuDetails;
