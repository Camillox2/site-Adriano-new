import React, { useState } from 'react';
import { ArrowRight, Calendar, CheckCircle2, ChevronDown, MessageSquare, Play, ShieldCheck, Target, TrendingUp } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import HifuDeviceViewer3d from '../components/HifuDeviceViewer3d';
import { images, videos } from '../assets';
import { WHATSAPP_ALUGAR_HIFU } from '../utils/constants';

const ADVANTAGES = [
  { Icon: ShieldCheck, title: 'Equipamento revisado', text: 'O Ultramed HIFU é preparado e conferido antes da locação.' },
  { Icon: Calendar, title: 'Agenda organizada', text: 'Entrega e retirada são combinadas conforme a disponibilidade da sua clínica.' },
  { Icon: Target, title: 'Orientação operacional', text: 'Você recebe as informações necessárias para planejar o seu dia de atendimento.' },
  { Icon: TrendingUp, title: 'Material de divulgação', text: 'Consulte as opções de suporte para comunicar o HIFU aos seus pacientes.' },
];

const CARTRIDGES = [
  { depth: '1,5 mm', title: 'Derme superficial', text: 'Indicada para protocolos que trabalham linhas finas e textura da pele.' },
  { depth: '3,0 mm', title: 'Derme profunda', text: 'Usada em protocolos de estímulo de colágeno e firmeza.' },
  { depth: '4,5 mm', title: 'Camada SMAS', text: 'Indicada para protocolos de sustentação e contorno facial.' },
];

const VIDEOS = [
  { title: 'Aplicação de HIFU', description: 'Veja o atendimento e o equipamento em uso.', poster: images.posterHifu, src: videos.hifu },
  { title: 'Técnica e ponteira', description: 'Detalhes da aplicação do Ultramed HIFU.', poster: images.posterHifuTres, src: videos.hifuTres },
  { title: 'Atendimento personalizado', description: 'Um recorte da experiência de atendimento.', poster: images.posterHifuAtendimento, src: videos.hifuAtendimento },
];

const FAQS = [
  { q: 'Como funciona a entrega e a retirada?', a: 'A logística é alinhada com a sua agenda e a região de atendimento antes da confirmação da locação.' },
  { q: 'Quais ponteiras acompanham o equipamento?', a: 'A disponibilidade das ponteiras faciais de 1,5 mm, 3,0 mm e 4,5 mm é confirmada no momento da locação.' },
  { q: 'Quem pode operar o Ultramed HIFU?', a: 'O equipamento deve ser utilizado por profissionais habilitados e capacitados, respeitando as regras aplicáveis ao seu conselho profissional.' },
  { q: 'Posso consultar datas para a minha cidade?', a: 'Sim. Fale pelo WhatsApp, informe sua cidade e a data desejada para verificar a disponibilidade.' },
];

const BeforeAfter = () => {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-sm select-none overflow-hidden rounded-3xl bg-slate-950 shadow-xl shadow-slate-200/80">
      <img src={images.faceAfter} alt="Resultado após o tratamento" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img src={images.faceBefore} alt="Imagem antes do tratamento" className="h-full w-[calc(100vw-2rem)] max-w-sm object-cover" loading="lazy" />
      </div>
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${position}%` }}>
        <span className="absolute inset-y-0 -left-px w-0.5 bg-white shadow-[0_0_0_1px_rgba(15,23,42,.12)]" />
        <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xs font-black tracking-tight text-slate-800 shadow-lg">↔</span>
      </div>
      <span className="absolute left-4 top-4 rounded-full bg-slate-900/75 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white">Antes</span>
      <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-800">Depois</span>
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label="Comparar antes e depois"
        className="absolute inset-0 z-10 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
};

const AlugarHifu = () => {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Seo
        title="Locação de Ultramed HIFU para Clínicas | Dr. Adriano Camillo"
        description="Locação de Ultramed HIFU para profissionais e clínicas habilitados, com equipamento real, logística agendada, orientação operacional e suporte conforme o serviço contratado."
        path="/alugar_hifu"
      />
      <Header />

      <main id="inicio-locacao">
        <section className="border-b border-slate-200 bg-white pt-28 pb-14 md:pt-36 md:pb-20">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
              <Reveal y={18}>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-secondary-700">Exclusivo para profissionais e clínicas</p>
                <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">Quer levar o HIFU para a sua clínica?</h1>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">Conheça a locação do Ultramed HIFU, veja o equipamento real e consulte uma data para a sua agenda.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href={WHATSAPP_ALUGAR_HIFU} target="_blank" rel="noopener noreferrer" className="btn-primary text-base md:text-lg"><MessageSquare size={19} aria-hidden="true" />Consultar locação</a>
                  <a href="#videos-hifu" className="btn-outline text-base md:text-lg">Ver o HIFU em ação</a>
                </div>
                <div className="mt-8 grid grid-cols-1 gap-3 text-sm text-slate-600 sm:grid-cols-2">
                  <p className="flex gap-2"><CheckCircle2 size={18} className="shrink-0 text-secondary-600" />Equipamento e atendimento reais</p>
                  <p className="flex gap-2"><CheckCircle2 size={18} className="shrink-0 text-secondary-600" />Informações para profissionais habilitados</p>
                </div>
              </Reveal>
              <Reveal delay={120} y={18} className="motion-safe:animate-fade-in" >
                <div id="aparelho-locacao" className="transition-transform duration-500 hover:-translate-y-1"><HifuDeviceViewer3d /></div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="videos-hifu" className="section bg-slate-50">
          <div className="container mx-auto px-4">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-secondary-700">HIFU em ação</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">Vídeos reais de atendimento</h2>
              <p className="mt-4 text-slate-600">Veja o Ultramed HIFU e a aplicação na prática. Os vídeos estão aqui na página, prontos para assistir.</p>
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {VIDEOS.map((video, index) => (
                <Reveal key={video.title} delay={index * 100} y={18}>
                  <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <video className="aspect-[9/16] w-full bg-slate-100 object-cover" controls playsInline preload="metadata" poster={video.poster}>
                      <source src={video.src} type="video/mp4" />
                      Seu navegador não suporta vídeo.
                    </video>
                    <div className="p-5"><span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-secondary-700"><Play size={14} fill="currentColor" />Vídeo real</span><h3 className="text-lg font-bold text-slate-900">{video.title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">{video.description}</p></div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="resultado-hifu" className="section bg-white">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <Reveal y={18}><BeforeAfter /></Reveal>
              <Reveal delay={120} y={18}>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-secondary-700">Resultado visível</p>
                <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">Antes e depois, sem esconder o processo</h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">Arraste o controle sobre a imagem para comparar. Para a clínica, isso ajuda a conversar sobre expectativas reais e sobre a importância de uma avaliação individual.</p>
                <div className="mt-7 rounded-2xl border border-secondary-100 bg-secondary-50 p-5 text-sm leading-relaxed text-slate-700"><strong className="text-slate-900">Importante:</strong> cada paciente responde de uma forma. Imagens clínicas ilustram resultados individuais e não constituem promessa de resultado.</div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="ponteiras-locacao" className="section bg-slate-50">
          <div className="container mx-auto px-4">
            <Reveal className="mx-auto max-w-2xl text-center"><p className="text-xs font-bold uppercase tracking-[0.15em] text-secondary-700">Ponteiras faciais</p><h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">Entenda cada profundidade</h2><p className="mt-4 text-slate-600">A definição do protocolo e da indicação é sempre profissional e individualizada.</p></Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {CARTRIDGES.map((cartridge, index) => <Reveal key={cartridge.depth} delay={index * 100} y={18}><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"><p className="text-2xl font-bold text-secondary-700">{cartridge.depth}</p><h3 className="mt-4 text-xl font-bold text-slate-900">{cartridge.title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-600">{cartridge.text}</p></article></Reveal>)}
            </div>
          </div>
        </section>

        <section id="vantagens-locacao" className="section bg-white">
          <div className="container mx-auto px-4">
            <Reveal className="mx-auto max-w-2xl text-center"><p className="text-xs font-bold uppercase tracking-[0.15em] text-secondary-700">Como funciona</p><h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">Uma locação pensada para a rotina da clínica</h2></Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {ADVANTAGES.map(({ Icon, title, text }, index) => <Reveal key={title} delay={index * 90} y={18}><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"><span className="inline-flex rounded-xl bg-secondary-50 p-3 text-secondary-700"><Icon size={22} aria-hidden="true" /></span><h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p></article></Reveal>)}
            </div>
          </div>
        </section>

        <section id="duvidas-locacao" className="section bg-slate-50">
          <div className="container mx-auto px-4"><Reveal className="mx-auto max-w-2xl text-center"><p className="text-xs font-bold uppercase tracking-[0.15em] text-secondary-700">Dúvidas frequentes</p><h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">Sobre a locação</h2></Reveal>
            <div className="mx-auto mt-10 max-w-3xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white"><Reveal>{FAQS.map((faq, index) => { const expanded = openFaq === index; return <div key={faq.q}><button type="button" onClick={() => setOpenFaq(expanded ? -1 : index)} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6" aria-expanded={expanded}><span className="font-semibold text-slate-900">{faq.q}</span><ChevronDown size={20} className={`shrink-0 text-secondary-700 transition-transform ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" /></button>{expanded && <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600 sm:px-6">{faq.a}</p>}</div>; })}</Reveal></div>
          </div>
        </section>

        <section className="bg-secondary-50 py-16 md:py-20"><Reveal className="container mx-auto px-4 text-center"><h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Quer consultar uma data?</h2><p className="mx-auto mt-4 max-w-2xl text-slate-600">Informe sua cidade e o período desejado. Assim, verificamos a disponibilidade do Ultramed HIFU para a sua clínica.</p><a href={WHATSAPP_ALUGAR_HIFU} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8 text-base md:text-lg">Consultar disponibilidade<ArrowRight size={20} aria-hidden="true" /></a></Reveal></section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default AlugarHifu;
