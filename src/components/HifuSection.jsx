import React, { useState, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle,
  ArrowRight,
  Play,
  X,
  Zap,
  Timer,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import { videos, images } from '../assets';
import { WHATSAPP_HIFU } from '../utils/constants';
import Reveal from './Reveal';

// ---------- dados ----------
export const HIFU_VIDEOS = [
  {
    id: 'hifu',
    title: 'O procedimento HIFU na prática',
    description: 'Veja como a aplicação do ultrassom microfocado é realizada no consultório.',
    duration: '0:09',
    poster: images.posterHifu,
    video: videos.hifu,
  },
  {
    id: 'hifuTres',
    title: 'Aplicação com o equipamento Ultramed',
    description: 'Detalhe da ponteira e da técnica de aplicação nas áreas tratadas.',
    duration: '0:11',
    poster: images.posterHifuTres,
    video: videos.hifuTres,
  },
  {
    id: 'hifuAtendimento',
    title: 'Atendimento e avaliação',
    description: 'Como funciona o atendimento personalizado antes do procedimento.',
    duration: '0:16',
    poster: images.posterHifuAtendimento,
    video: videos.hifuAtendimento,
  },
  {
    id: 'hifuDois',
    title: 'Tecnologia em movimento',
    description: 'O equipamento de ultrassom microfocado em funcionamento.',
    duration: '0:05',
    poster: images.posterHifuDois,
    video: videos.hifuDois,
  },
];

const BENEFITS = [
  'Lifting facial sem cortes e sem agulhas',
  'Estimula o colágeno natural da sua pele',
  'Sessão única na maioria dos casos',
  'Sem afastamento das atividades',
  'Resultados progressivos por até 6 meses',
  'Tecnologia consolidada mundialmente',
];

const HIGHLIGHTS = [
  {
    icon: Zap,
    title: 'Energia focada e precisa',
    text: 'O ultrassom microfocado atinge as camadas profundas da pele (SMAS) — as mesmas tratadas em um lifting cirúrgico — sem danificar a superfície.',
  },
  {
    icon: TrendingUp,
    title: 'Colágeno novo, resultado natural',
    text: 'O calor controlado estimula a produção natural de colágeno. A pele fica mais firme de forma gradual, sem aspecto artificial.',
  },
  {
    icon: Timer,
    title: 'Rotina preservada',
    text: 'Procedimento realizado em consultório, sem internação e sem tempo de recuperação. Você volta às suas atividades no mesmo dia.',
  },
];

// ---------- card de vídeo ----------
const VideoCard = memo(({ video, onClick }) => (
  <button
    onClick={onClick}
    className="card card-lift group overflow-hidden text-left w-full focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-300"
    aria-label={`Assistir: ${video.title}`}
  >
    <div className="relative">
      <img
        src={video.poster}
        alt={video.title}
        loading="lazy"
        width="640"
        height="360"
        className="w-full h-44 md:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="bg-white/95 rounded-full p-3.5 shadow-lg group-hover:scale-110 group-hover:bg-primary-600 transition-all duration-300">
          <Play
            className="text-primary-700 group-hover:text-white transition-colors"
            size={26}
            fill="currentColor"
            aria-hidden="true"
          />
        </span>
      </div>
      <span className="absolute top-3 right-3 bg-slate-900/80 text-white px-2.5 py-1 rounded-full text-xs font-medium">
        {video.duration}
      </span>
    </div>
    <div className="p-5">
      <h3 className="font-bold text-slate-900 group-hover:text-primary-700 transition-colors leading-snug">
        {video.title}
      </h3>
      <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">{video.description}</p>
    </div>
  </button>
));

VideoCard.displayName = 'VideoCard';

// ---------- modal de vídeo ----------
export const VideoModal = ({ video, onClose }) => (
  <div
    className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
    onClick={onClose}
    role="dialog"
    aria-modal="true"
    aria-label={video.title}
  >
    <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={onClose}
        className="absolute -top-12 right-0 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2.5 transition-colors"
        aria-label="Fechar vídeo"
      >
        <X size={24} />
      </button>
      <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
        <video
          className="w-full aspect-video bg-black"
          controls
          autoPlay
          playsInline
          poster={video.poster}
          src={video.video}
        >
          Seu navegador não suporta o elemento de vídeo.
        </video>
        <div className="p-5 md:p-6">
          <h3 className="text-lg md:text-xl font-bold text-white">{video.title}</h3>
          <p className="text-slate-300 text-sm md:text-base mt-1">{video.description}</p>
        </div>
      </div>
    </div>
  </div>
);

// ---------- seção ----------
const HifuSection = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const close = useCallback(() => setActiveVideo(null), []);

  return (
    <section id="hifu" className="section bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Cabeçalho */}
        <Reveal className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="section-eyebrow">
            <Zap size={14} aria-hidden="true" />
            Ultrassom Microfocado
          </span>
          <h2 className="section-title mt-5">
            HIFU: lifting facial{' '}
            <span className="text-primary-700">sem cirurgia</span>
          </h2>
          <p className="section-subtitle mt-5">
            O HIFU (High Intensity Focused Ultrasound) é o tratamento de eleição
            para quem deseja combater a flacidez facial, definir o contorno do
            rosto e rejuvenescer — tudo isso sem cortes, sem agulhas e sem
            afastamento da rotina.
          </p>
        </Reveal>

        {/* Como funciona */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14 md:mb-20">
          {HIGHLIGHTS.map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 130}>
              <div className="card card-lift p-7 h-full">
                <span className="inline-flex p-3 rounded-2xl bg-primary-50 text-primary-700 mb-5">
                  <Icon size={26} aria-hidden="true" />
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Equipamento + benefícios */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-14 md:mb-20">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src={images.hifuEquipamento}
                alt="Dr. Adriano Camillo com o equipamento de HIFU Ultramed"
                loading="lazy"
                width="480"
                height="640"
                className="rounded-2xl shadow-lg object-cover object-top w-full h-80 md:h-[26rem]"
              />
              <img
                src={images.consultorio3}
                alt="Dr. Adriano Camillo ao lado do equipamento Ultramed HIFU no consultório"
                loading="lazy"
                width="480"
                height="640"
                className="rounded-2xl shadow-lg object-cover object-top w-full h-80 md:h-[26rem] mt-8"
              />
            </div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-2xl px-6 py-3.5 flex items-center gap-3 border border-slate-100">
              <ShieldCheck className="text-emerald-600 shrink-0" size={26} aria-hidden="true" />
              <span className="text-sm font-semibold text-slate-800 whitespace-nowrap">
                Equipamento Ultramed HIFU
                <span className="block text-xs font-normal text-slate-600">
                  Tecnologia profissional de consultório
                </span>
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Por que escolher o HIFU?
            </h3>
            <p className="text-slate-600 leading-relaxed mb-7">
              Indicado para flacidez leve a moderada na face, pescoço e papada, o
              ultrassom microfocado devolve firmeza à pele estimulando o que ela
              tem de melhor: o seu próprio colágeno.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BENEFITS.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 bg-white border border-slate-100 rounded-xl p-3.5"
                >
                  <CheckCircle
                    size={20}
                    className="text-emerald-600 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-slate-700 text-sm font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/hifu"
              className="inline-flex items-center gap-2 text-primary-700 font-semibold mt-7 hover:gap-3.5 transition-all"
            >
              Saiba tudo sobre o Ultrassom Microfocado
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Vídeos */}
        <div className="mb-14 md:mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-8">
            Veja o HIFU de perto
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HIFU_VIDEOS.map((video, index) => (
              <Reveal key={video.id} delay={index * 110}>
                <VideoCard video={video} onClick={() => setActiveVideo(video)} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-slate-900 rounded-3xl px-6 py-12 md:p-14 text-center relative overflow-hidden">
          <div
            className="absolute -top-24 -right-24 w-72 h-72 bg-primary-600/20 rounded-full blur-3xl"
            aria-hidden="true"
          ></div>
          <div
            className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-600/20 rounded-full blur-3xl"
            aria-hidden="true"
          ></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight">
              Será que o HIFU é para você?
            </h3>
            <p className="text-slate-300 mt-4 mb-8 text-base md:text-lg leading-relaxed">
              Cada rosto é único. Agende uma avaliação personalizada com o Dr.
              Adriano e descubra, sem compromisso, o plano ideal para o seu caso.
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
            <p className="text-slate-300 text-sm mt-5">
              Atendimento em São Lourenço do Oeste, Realeza, Ampére e Curitiba
            </p>
          </div>
        </div>
      </div>

      {activeVideo && <VideoModal video={activeVideo} onClose={close} />}
    </section>
  );
};

export default HifuSection;
