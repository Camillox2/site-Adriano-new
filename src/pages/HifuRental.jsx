import React, { useCallback, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  ChevronDown,
  ClipboardCheck,
  GraduationCap,
  MapPin,
  MessageCircle,
  PackageCheck,
  Play,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Truck,
  Users,
  Zap,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import HifuInteractiveLab from '../components/HifuInteractiveLab';
import { HIFU_VIDEOS, VideoModal } from '../components/HifuSection';
import { images } from '../assets';
import { WHATSAPP_RENTAL } from '../utils/constants';

const AUDIENCES = [
  [Stethoscope, 'Profissionais habilitados', 'Para quem atua com estética facial ou corporal e deseja consultar o equipamento.'],
  [Building2, 'Clínicas e consultórios', 'Uma alternativa para criar datas especiais sem comprar imediatamente a plataforma.'],
  [Users, 'Dias de procedimento', 'Organize avaliações e atendimentos em uma agenda concentrada.'],
];

const BENEFITS = [
  [CalendarDays, 'Datas sob consulta', 'Disponibilidade, período e região são definidos no orçamento.'],
  [PackageCheck, 'Configuração transparente', 'Aplicadores, cartuchos, transporte e responsabilidades ficam registrados.'],
  [Truck, 'Logística combinada', 'Entrega e retirada são alinhadas conforme localização e condições aprovadas.'],
  [ShieldCheck, 'Uso responsável', 'A operação exige profissional habilitado, avaliação e cumprimento das normas aplicáveis.'],
];

const STEPS = [
  [MessageCircle, 'Envie a solicitação', 'Informe cidade, data e estimativa de atendimentos.'],
  [CalendarDays, 'Valide a agenda', 'A equipe verifica disponibilidade e deslocamento.'],
  [ClipboardCheck, 'Receba a proposta', 'As condições comerciais e operacionais são apresentadas.'],
  [BadgeCheck, 'Confirme a reserva', 'A data é confirmada após o aceite das condições.'],
];

const FAQS = [
  ['Quanto custa alugar o HIFU?', 'O valor depende da cidade, período, configuração e logística. Solicite uma proposta personalizada pelo WhatsApp.'],
  ['Quais ponteiras podem acompanhar?', 'A configuração deve ser confirmada na proposta. A experiência demonstra 1,5 mm, 3,0 mm, 4,5 mm, 8,0 mm e 13,0 mm.'],
  ['Qualquer pessoa pode operar?', 'Não. A locação não substitui habilitação, capacitação, avaliação do paciente nem regras profissionais e sanitárias.'],
  ['A locação inclui treinamento?', 'Treinamento, orientação, suporte e demais itens precisam ser confirmados na proposta.'],
  ['Em quais cidades está disponível?', 'A área atendida e os custos de deslocamento são verificados caso a caso.'],
];

const FAQ_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(([question, answer]) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
};

const HifuRental = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);
  const closeVideo = useCallback(() => setActiveVideo(null), []);

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="Aluguel de HIFU para Clínicas | Dr. Adriano Camillo"
        description="Consulte a locação do Ultramed HIFU para clínicas e profissionais habilitados. Veja o aparelho em 360°, explore as ponteiras e solicite disponibilidade."
        path="/alugar_hifu"
        jsonLd={FAQ_JSONLD}
      />
      <Header />

      <main>
        <section className="relative min-h-[46rem] pt-32 pb-16 flex items-center overflow-hidden bg-slate-950">
          <img
            src={images.hifuEquipamentoDois}
            alt="Equipamento Ultramed HIFU"
            className="absolute inset-0 w-full h-full object-cover opacity-25 animate-kenburns"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-950/50"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(34,211,238,0.22),transparent_34%),radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.17),transparent_30%)]"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-10 items-center">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 border border-cyan-300/20 text-cyan-300 px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-[0.16em]">
                  <Sparkles size={16} aria-hidden="true" />
                  Locação para profissionais e clínicas
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.03] tracking-tight mt-6">
                  Leve a experiência HIFU para a sua clínica
                </h1>
                <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mt-6 max-w-2xl">
                  Explore o equipamento em 360°, entenda cada profundidade e consulte uma data de locação sob medida.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <a href={WHATSAPP_RENTAL} target="_blank" rel="noopener noreferrer" className="btn-primary text-base sm:text-lg">
                    Consultar disponibilidade
                    <ArrowRight size={20} aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    onClick={() => document.getElementById('experiencia-3d')?.scrollIntoView({ behavior: 'smooth' })}
                    className="btn-outline-light text-base sm:text-lg"
                  >
                    Ver experiência 3D
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-9 max-w-2xl">
                  {[['5', 'profundidades'], ['360°', 'visualização'], ['4', 'vídeos reais']].map(([value, label]) => (
                    <div key={label} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                      <span className="block text-2xl font-black text-white">{value}</span>
                      <span className="block text-xs text-slate-400 mt-1">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="absolute -inset-10 rounded-full bg-cyan-400/10 blur-3xl"></div>
                <img
                  src={images.hifuEquipamento}
                  alt="Dr. Adriano Camillo ao lado do Ultramed HIFU"
                  width="720"
                  height="960"
                  className="relative w-full max-h-[39rem] object-cover object-top rounded-[2.4rem] border border-white/20 shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container mx-auto px-4">
            <Reveal className="text-center max-w-3xl mx-auto mb-12">
              <span className="section-eyebrow">Para quem é</span>
              <h2 className="section-title mt-5">Uma experiência pensada para quem oferece procedimentos</h2>
              <p className="section-subtitle mt-5">A indicação clínica e a operação continuam sendo responsabilidades técnicas do profissional habilitado.</p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {AUDIENCES.map(([Icon, title, text], index) => (
                <Reveal key={title} delay={index * 120}>
                  <div className="card card-lift p-7 h-full">
                    <span className="inline-flex h-12 w-12 rounded-2xl bg-primary-50 text-primary-700 items-center justify-center mb-5"><Icon size={25} /></span>
                    <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                    <p className="text-slate-600 leading-relaxed mt-2">{text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="experiencia-3d" className="section bg-slate-100 overflow-hidden">
          <div className="container mx-auto px-4">
            <Reveal className="text-center max-w-3xl mx-auto mb-12">
              <span className="section-eyebrow"><Zap size={14} /> Experiência interativa</span>
              <h2 className="section-title mt-5">Veja o equipamento em <span className="text-primary-700">360°</span> e teste as ponteiras</h2>
              <p className="section-subtitle mt-5">Gire o modelo, selecione um cartucho e arraste a ponteira para acompanhar a representação do foco.</p>
            </Reveal>
            <HifuInteractiveLab mode="rental" />
          </div>
        </section>

        <section className="section bg-white">
          <div className="container mx-auto px-4">
            <Reveal className="text-center max-w-3xl mx-auto mb-12">
              <span className="section-eyebrow">Como funciona</span>
              <h2 className="section-title mt-5">Da consulta à reserva</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              {STEPS.map(([Icon, title, text], index) => (
                <Reveal key={title} delay={index * 100}>
                  <div className="relative card p-6 h-full">
                    <span className="absolute top-5 right-5 text-5xl font-black text-slate-100">{index + 1}</span>
                    <Icon size={25} className="text-primary-700" />
                    <h3 className="text-xl font-bold text-slate-900 mt-5">{title}</h3>
                    <p className="text-slate-600 mt-2 leading-relaxed">{text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
              {BENEFITS.map(([Icon, title, text]) => (
                <div key={title} className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
                  <Icon size={22} className="text-secondary-700" />
                  <h3 className="font-bold text-slate-900 mt-3">{title}</h3>
                  <p className="text-sm text-slate-600 mt-1.5">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-slate-950 text-white">
          <div className="container mx-auto px-4">
            <Reveal className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-cyan-300 text-xs font-bold uppercase tracking-[0.2em]">Vídeos originais</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-5">Veja o equipamento real em funcionamento</h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {HIFU_VIDEOS.map((video) => (
                <button type="button" key={video.id} onClick={() => setActiveVideo(video)} className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 text-left group">
                  <div className="relative">
                    <img src={video.poster} alt={video.title} loading="lazy" className="w-full h-48 object-cover group-hover:scale-105 transition-transform" />
                    <span className="absolute inset-0 flex items-center justify-center bg-slate-950/25"><span className="h-14 w-14 rounded-full bg-white flex items-center justify-center"><Play size={23} fill="currentColor" className="text-primary-700 ml-1" /></span></span>
                  </div>
                  <div className="p-5"><h3 className="font-bold text-white">{video.title}</h3><p className="text-sm text-slate-400 mt-2">{video.description}</p></div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <span className="section-eyebrow">Dúvidas frequentes</span>
              <h2 className="section-title mt-5">Antes de solicitar</h2>
              <div className="mt-7 rounded-2xl bg-primary-50 border border-primary-100 p-5 flex gap-3">
                <GraduationCap size={24} className="text-primary-700 shrink-0" />
                <p className="text-sm text-slate-700">A página não substitui treinamento, manual, avaliação clínica ou regras profissionais.</p>
              </div>
            </div>
            <div className="space-y-4">
              {FAQS.map(([question, answer], index) => (
                <div key={question} className="rounded-2xl border border-slate-200 overflow-hidden">
                  <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} className="w-full p-5 flex justify-between gap-4 text-left font-bold text-slate-900" aria-expanded={openFaq === index}>
                    {question}<ChevronDown className={`shrink-0 text-primary-700 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} size={21} />
                  </button>
                  {openFaq === index && <p className="px-5 pb-5 text-slate-600 leading-relaxed animate-fade-in">{answer}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-slate-950 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.16),transparent_42%)]"></div>
          <div className="container mx-auto px-4 relative z-10 max-w-3xl">
            <MapPin size={34} className="text-cyan-300 mx-auto" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-5">Consulte a disponibilidade para sua cidade</h2>
            <p className="text-slate-300 text-lg mt-5">Envie a data, localização e estimativa de atendimentos para receber as condições.</p>
            <a href={WHATSAPP_RENTAL} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8 text-base sm:text-lg">Solicitar proposta<ArrowRight size={20} /></a>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      {activeVideo && <VideoModal video={activeVideo} onClose={closeVideo} />}
    </div>
  );
};

export default HifuRental;
