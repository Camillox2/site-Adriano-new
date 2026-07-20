import React, { useState, useCallback } from 'react';
import {
  CheckCircle,
  Play,
  Zap,
  Target,
  ShieldCheck,
  TrendingUp,
  Calendar,
  MessageSquare,
  Award,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import HifuDeviceViewer3d from '../components/HifuDeviceViewer3d';
import HifuPullAndApplySimulator from '../components/HifuPullAndApplySimulator';
import { HIFU_VIDEOS, VideoModal } from '../components/HifuSection';
import { WHATSAPP_ALUGAR_HIFU } from '../utils/constants';

const RENTAL_ADVANTAGES = [
  {
    Icon: Award,
    title: 'Equipamento Original ANVISA',
    description: 'Trabalhe com total segurança jurídica e técnica. Nosso equipamento Ultramed HIFU possui homologação completa e calibração periódica rigorosa.'
  },
  {
    Icon: Target,
    title: 'Treinamento Prático Completo',
    description: 'Disponibilizamos treinamento exclusivo presencial ou em vídeo para sua equipe dominar a aplicação, os protocolos e a seleção de cartuchos.'
  },
  {
    Icon: ShieldCheck,
    title: 'Suporte de Aplicação em Tempo Real',
    description: 'Canal de suporte direto durante o seu dia de atendimento para tirar dúvidas clínicas sobre profundidade de dosagem e vetores de aplicação.'
  },
  {
    Icon: TrendingUp,
    title: 'Kit de Marketing de Atração',
    description: 'Receba materiais de divulgação prontos (banners digitais, vídeos explicativos para pacientes e textos prontos) para lotar a agenda do seu "HIFU Day".'
  },
  {
    Icon: Calendar,
    title: 'Logística Pontual Garantida',
    description: 'Entregamos e retiramos o equipamento diretamente na sua clínica, com data e horário agendados, em toda a região de atendimento.'
  },
  {
    Icon: Zap,
    title: 'Alta Rentabilidade Comercial',
    description: 'O HIFU é um dos tratamentos estéticos mais valorizados do mercado. Recupere o investimento da locação com apenas 2 a 3 pacientes atendidos no dia.'
  }
];

const FAQS_RENTAL = [
  {
    question: 'Como funciona a entrega e retirada do aparelho?',
    answer: 'Entregamos o equipamento higienizado e calibrado diretamente na sua clínica no início da manhã do dia agendado (ou no final da tarde anterior, conforme logística) e retiramos ao término dos seus atendimentos. A taxa de transporte é calculada sob demanda por cidade.'
  },
  {
    question: 'É fornecido algum tipo de treinamento?',
    answer: 'Sim! Entendemos que a segurança do seu paciente é prioridade. Oferecemos um manual de uso detalhado, treinamento completo sobre os protocolos faciais e corporais, além de suporte telefônico direto para dúvidas clínicas na hora do procedimento.'
  },
  {
    question: 'Quais cartuchos vêm inclusos na locação?',
    answer: 'A locação padrão inclui a manopla de aplicação e os 3 cartuchos faciais essenciais (1.5mm, 3.0mm e 4.5mm). Você pode optar por pacotes de locação com disparos livres ou pagar uma taxa justa por disparo efetuado. Também disponibilizamos cartuchos corporais sob consulta prévia.'
  },
  {
    question: 'Quem pode operar o equipamento de HIFU?',
    answer: 'O equipamento Ultramed HIFU deve ser operado por profissionais da área da saúde estética devidamente habilitados por seus respectivos conselhos de classe (Dentistas, Biomédicos, Farmacêuticos, Fisioterapeutas dermatofuncionais, Médicos, etc.) que possuam capacitação em ultrassom microfocado.'
  },
  {
    question: 'O que acontece se o equipamento apresentar alguma falha?',
    answer: 'Nossos aparelhos passam por testes e revisões completas antes de cada entrega. Caso haja qualquer intercorrência técnica rara durante a locação, nosso suporte técnico atua imediatamente para sanar a dúvida ou providenciar a substituição emergencial.'
  }
];

const FaqItem = ({ faq, open, onToggle }) => (
  <div className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden shadow-md hover:border-cyan-500/20 transition-all duration-300">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left focus:outline-none"
      aria-expanded={open}
    >
      <span className="font-bold text-white md:text-lg">{faq.question}</span>
      <ChevronDown
        size={20}
        className={`shrink-0 text-cyan-400 transition-transform duration-300 ${
          open ? 'rotate-180' : ''
        }`}
      />
    </button>
    {open && (
      <div className="px-5 md:px-6 pb-5 md:pb-6 -mt-1 animate-fade-in">
        <p className="text-slate-400 leading-relaxed text-sm md:text-base">{faq.answer}</p>
      </div>
    )}
  </div>
);

const AlugarHifu = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);
  const closeVideo = useCallback(() => setActiveVideo(null), []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Seo
        title="Locação de HIFU Ultramed — São Lourenço do Oeste e Região | Dr. Adriano Camillo"
        description="Alugue o equipamento de Ultrassom Microfocado (Ultramed HIFU) para sua clínica. Equipamento original ANVISA, logística agendada, suporte clínico e kit de marketing inclusos. Aumente o faturamento de sua clínica."
        path="/alugar_hifu"
      />
      <Header />

      <main id="inicio-locacao">
        
        {/* 1. Hero B2B Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-radial-gradient">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl opacity-60" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-400/25 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wider text-cyan-400 mb-6 uppercase">
                <Zap size={14} className="animate-pulse" />
                Locação de Equipamentos de Alta Tecnologia
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white">
                Fature mais em sua clínica alugando o{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                  Ultramed HIFU
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-300 mt-6 leading-relaxed max-w-3xl mx-auto">
                Ofereça lifting facial não invasivo e rejuvenescimento de alto padrão por diárias justas. Receba suporte clínico completo, entrega agendada e material de marketing para lotar sua agenda.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <a
                  href={WHATSAPP_ALUGAR_HIFU}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-base md:text-lg flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 border border-cyan-400/20 hover:from-cyan-600 hover:to-cyan-700 shadow-cyan-500/20"
                >
                  <MessageSquare size={19} />
                  Falar com Consultor
                </a>
                <button
                  onClick={() =>
                    document.getElementById('simulador-locacao')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="btn-outline-light text-base md:text-lg hover:bg-slate-900 border-white/20"
                >
                  Testar Simulador 3D
                </button>
              </div>

              {/* Trust Markers */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-white/5 max-w-3xl mx-auto text-left">
                <div>
                  <div className="text-cyan-400 font-bold text-xl md:text-2xl">ANVISA</div>
                  <div className="text-slate-400 text-xs mt-1">Aparelho 100% Homologado</div>
                </div>
                <div>
                  <div className="text-cyan-400 font-bold text-xl md:text-2xl">Logística</div>
                  <div className="text-slate-400 text-xs mt-1">Entrega e Retirada na Clínica</div>
                </div>
                <div>
                  <div className="text-cyan-400 font-bold text-xl md:text-2xl">Suporte</div>
                  <div className="text-slate-400 text-xs mt-1">Apoio Clínico na Aplicação</div>
                </div>
                <div>
                  <div className="text-cyan-400 font-bold text-xl md:text-2xl">Marketing</div>
                  <div className="text-slate-400 text-xs mt-1">Kit para captação de pacientes</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Visualizador 3D do Aparelho */}
        <section id="aparelho-locacao" className="section bg-slate-900/30 border-y border-white/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-5">
                <span className="inline-flex items-center gap-1.5 text-xs text-cyan-400 font-bold tracking-widest uppercase mb-4">
                  Engenharia e Estrutura
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  Design Robusto e <br />
                  Tecnologia Certificada
                </h2>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed mt-6">
                  O Ultramed é sinônimo de precisão e segurança no mercado de Harmonização Facial e Corporal. Nosso gabinete é entregue com maleta antichoque de transporte, suporte cromado e manoplas calibradas.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-cyan-400 mt-1 shrink-0" />
                    <div>
                      <strong className="text-white block text-sm">Disparos Rápidos e Confortáveis</strong>
                      <span className="text-slate-400 text-xs">Padrão contínuo de energia linear focalizada.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-cyan-400 mt-1 shrink-0" />
                    <div>
                      <strong className="text-white block text-sm">Design Ergonomicamente Otimizado</strong>
                      <span className="text-slate-400 text-xs">Aplicador leve que minimiza o cansaço do profissional.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-cyan-400 mt-1 shrink-0" />
                    <div>
                      <strong className="text-white block text-sm">Calibração ANVISA Regular</strong>
                      <span className="text-slate-400 text-xs">Garantia de que a potência disparada é a potência entregue.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lado Direito: Visualizador 3D */}
              <div className="lg:col-span-7">
                <HifuDeviceViewer3d />
              </div>

            </div>
          </div>
        </section>

        {/* 3. Laboratório Virtual (Simulador Interativo) */}
        <section id="simulador-locacao" className="section bg-slate-950 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            
            <Reveal className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-flex items-center gap-1.5 text-xs text-cyan-400 font-bold tracking-widest uppercase mb-4">
                Experiência Prática
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Simulador de Aplicação HIFU
              </h2>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed mt-4">
                Entenda na prática o impacto de cada ponteira. Selecione o cartucho clínico de sustentação à esquerda e dê um disparo em uma das áreas demarcadas do rosto para ver a onda acústica em tempo real nas camadas da pele.
              </p>
            </Reveal>

            <Reveal delay={150}>
              <HifuPullAndApplySimulator />
            </Reveal>
            
          </div>
        </section>

        {/* 4. Especificações de Ponteiras */}
        <section id="ponteiras-locacao" className="section bg-slate-900/30 border-y border-white/5">
          <div className="container mx-auto px-4">
            
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs text-cyan-400 font-bold tracking-widest uppercase mb-4 block">
                Profundidade Exata
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Os 3 Níveis Clínicos de Rejuvenescimento
              </h2>
              <p className="text-slate-400 text-sm md:text-base mt-4">
                A entrega precisa da energia térmica em diferentes níveis da derme e do SMAS garante resultados globais incomparáveis aos seus pacientes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="bg-slate-950 border border-white/5 rounded-3xl p-6 md:p-8 hover:border-cyan-500/20 transition-all duration-300">
                <span className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs bg-cyan-500/10 border border-cyan-400/25 text-cyan-400 mb-6">
                  1.5
                </span>
                <h3 className="text-xl font-bold text-white mb-2">Ponteira 1,5 mm</h3>
                <span className="text-slate-400 text-xs font-semibold block mb-4 uppercase tracking-wider">
                  Derme Superficial
                </span>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Atua diretamente na derme papilar. É ideal para suavizar rugas periorbitais, linhas finas na região da testa, melhorar os poros abertos e devolver a luminosidade natural e viço à pele.
                </p>
                <div className="pt-4 border-t border-white/5 text-xs text-slate-400">
                  <strong>Áreas comuns:</strong> Testa, área dos olhos (pés de galinha), bochechas superficiais.
                </div>
              </div>

              <div className="bg-slate-950 border border-white/5 rounded-3xl p-6 md:p-8 hover:border-emerald-500/20 transition-all duration-300">
                <span className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs bg-emerald-500/10 border border-emerald-400/25 text-emerald-400 mb-6">
                  3.0
                </span>
                <h3 className="text-xl font-bold text-white mb-2">Ponteira 3,0 mm</h3>
                <span className="text-slate-400 text-xs font-semibold block mb-4 uppercase tracking-wider">
                  Derme Profunda
                </span>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Foca na derme reticular, onde há maior concentração de fibroblastos. Provoca a retração e regeneração do colágeno antigo e estimula a formação de um novo colágeno, devolvendo a elasticidade e densidade.
                </p>
                <div className="pt-4 border-t border-white/5 text-xs text-slate-400">
                  <strong>Áreas comuns:</strong> Terço médio da face, pescoço e contorno mandibular.
                </div>
              </div>

              <div className="bg-slate-950 border border-white/5 rounded-3xl p-6 md:p-8 hover:border-amber-500/20 transition-all duration-300">
                <span className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs bg-amber-500/10 border border-amber-400/25 text-amber-400 mb-6">
                  4.5
                </span>
                <h3 className="text-xl font-bold text-white mb-2">Ponteira 4,5 mm</h3>
                <span className="text-slate-400 text-xs font-semibold block mb-4 uppercase tracking-wider">
                  Camada SMAS
                </span>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Alcança o Sistema Aponeurótico Muscular Superficial (SMAS). A onda de choque térmico contrai a estrutura muscular que sustenta a face, obtendo o efeito lifting real semelhante ao de uma cirurgia.
                </p>
                <div className="pt-4 border-t border-white/5 text-xs text-slate-400">
                  <strong>Áreas comuns:</strong> Papada, linha de bochechas caída (efeito bulldog) e pescoço profundo.
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 5. Vantagens da Locação */}
        <section id="vantagens-locacao" className="section bg-slate-950">
          <div className="container mx-auto px-4">
            
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs text-cyan-400 font-bold tracking-widest uppercase mb-4 block">
                Por que Alugar Conosco?
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Vantagens de Alugar o HIFU Ultramed
              </h2>
              <p className="text-slate-400 text-sm md:text-base mt-4">
                Oferecemos uma solução ponta a ponta para que você foque exclusivamente em realizar os procedimentos com segurança e lucrar.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {RENTAL_ADVANTAGES.map(({ Icon, title, description }, idx) => (
                <div 
                  key={idx} 
                  className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 hover:bg-slate-900/70 transition-colors"
                >
                  <span className="inline-flex p-3 rounded-xl bg-cyan-500/10 text-cyan-400 mb-4">
                    <Icon size={22} />
                  </span>
                  <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 6. Vídeos Clínicos */}
        <section className="section bg-slate-900/30 border-y border-white/5">
          <div className="container mx-auto px-4">
            
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs text-cyan-400 font-bold tracking-widest uppercase mb-4 block">
                Na Prática
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Veja o Equipamento no Consultório
              </h2>
              <p className="text-slate-400 text-sm md:text-base mt-4">
                Vídeos sem filtros mostrando a manopla de aplicação, os disparos e a ergonomia de uso real do equipamento Ultramed.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {HIFU_VIDEOS.map((video) => (
                <button
                  key={video.id}
                  onClick={() => setActiveVideo(video)}
                  className="bg-slate-950 border border-white/5 rounded-2xl overflow-hidden text-left focus:outline-none hover:border-cyan-500/20 group transition-all duration-300"
                  aria-label={`Assistir: ${video.title}`}
                >
                  <div className="relative">
                    <img
                      src={video.poster}
                      alt={video.title}
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-white/95 rounded-full p-3 shadow-lg group-hover:bg-cyan-500 group-hover:scale-110 transition-all">
                        <Play className="text-slate-950" size={20} fill="currentColor" />
                      </span>
                    </div>
                    <span className="absolute top-3 right-3 bg-slate-900/80 text-white px-2 py-0.5 rounded text-xs font-semibold">
                      {video.duration}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white text-sm leading-snug group-hover:text-cyan-400 transition-colors">
                      {video.title}
                    </h3>
                  </div>
                </button>
              ))}
            </div>

          </div>
        </section>

        {/* 7. FAQs Locação */}
        <section className="section bg-slate-950">
          <div className="container mx-auto px-4">
            
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs text-cyan-400 font-bold tracking-widest uppercase mb-4 block">
                Perguntas Frequentes
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Dúvidas sobre a Locação
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {FAQS_RENTAL.map((faq, index) => (
                <FaqItem
                  key={index}
                  faq={faq}
                  open={openFaq === index}
                  onToggle={() => setOpenFaq(openFaq === index ? -1 : index)}
                />
              ))}
            </div>

          </div>
        </section>

        {/* 8. CTA Final */}
        <section className="section relative bg-slate-900 overflow-hidden border-t border-white/5">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Consulte Disponibilidade e Monte sua Agenda
              </h2>
              <p className="text-slate-300 mt-5 mb-9 text-base md:text-lg leading-relaxed">
                As datas de locação para a região são preenchidas rapidamente. Fale com nosso consultor no WhatsApp, verifique as datas livres e receba nosso kit de captação hoje mesmo.
              </p>
              
              <a
                href={WHATSAPP_ALUGAR_HIFU}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base md:text-lg inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 border border-cyan-400/25 px-8 py-4 hover:from-cyan-600 hover:to-cyan-700 shadow-lg shadow-cyan-500/20"
              >
                Verificar Calendário de Locações
                <ArrowRight size={20} />
              </a>
              
              <p className="text-slate-400 text-xs mt-6">
                Disponível para consultórios em São Lourenço do Oeste (SC), Realeza (PR), Ampére (PR) e Região.
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

export default AlugarHifu;
