import React from 'react';
import { ArrowRight, CalendarCheck, Move3D, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { images } from '../assets';

const HifuRentalBanner = () => (
  <section className="section bg-white" aria-labelledby="rental-home-title">
    <div className="container mx-auto px-4">
      <div className="relative overflow-hidden rounded-[2.2rem] bg-slate-950 shadow-2xl border border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_85%_70%,rgba(16,185,129,0.16),transparent_35%)]"></div>
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] items-center relative z-10">
          <div className="p-7 sm:p-10 lg:p-14 xl:p-16">
            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 border border-cyan-300/20 text-cyan-300 px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-[0.16em]">
              <CalendarCheck size={16} aria-hidden="true" />
              Exclusivo para profissionais e clínicas
            </span>
            <h2 id="rental-home-title" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mt-6">
              Quer levar o HIFU para a sua clínica?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mt-5 max-w-2xl">
              Conheça a experiência de locação do Ultramed HIFU, veja o equipamento em 360° e entenda cada ponteira antes de consultar uma data.
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              <span className="inline-flex items-center gap-2 text-sm text-slate-200 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                <Move3D size={17} className="text-cyan-300" aria-hidden="true" />
                Modelo 3D interativo
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-slate-200 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                <Sparkles size={17} className="text-emerald-300" aria-hidden="true" />
                Simulação das ponteiras
              </span>
            </div>
            <Link to="/alugar_hifu" className="btn-primary mt-8 text-base sm:text-lg">
              Conhecer a locação do HIFU
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
          </div>

          <div className="relative min-h-[22rem] lg:min-h-[34rem] overflow-hidden">
            <img
              src={images.hifuEquipamento}
              alt="Dr. Adriano Camillo com o equipamento Ultramed HIFU disponível para consulta de locação"
              loading="lazy"
              width="720"
              height="960"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/20 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-slate-950/5 lg:to-slate-950"></div>
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-slate-950/80 backdrop-blur border border-white/10 p-4 text-white">
              <p className="font-bold">Ultramed HIFU real</p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">Fotos e vídeos originais do equipamento complementam a experiência interativa.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HifuRentalBanner;
