import React, { useEffect, useState } from 'react';
import {
  Phone,
  CheckCircle,
  TrendingUp,
  ShieldCheck,
  Zap,
  Target,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Award,
  Play
} from 'lucide-react';
import { SITE, WHATSAPP_DEFAULT } from '../utils/constants';
import { images, videos } from '../assets';
import Reveal from '../components/Reveal';
import SkinDiagram from '../components/SkinDiagram';

const HifuRentalDetails = ({ data }) => {
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <main className="min-h-screen bg-slate-50 pt-20">
      {/* Hero Section Premium com Vídeo/Foto do HIFU */}
      <section className="relative min-h-[90vh] flex items-center pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <video
            className="w-full h-full object-cover opacity-60"
            autoPlay
            muted
            loop
            playsInline
            poster={images.consultorio1}
            src={videos.hifuDois}
            tabIndex={-1}
          />
          {/* Gradients para dar contraste ao texto */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold tracking-widest uppercase mb-8">
                <Target size={16} aria-hidden="true" />
                {data.eyebrow}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight">
                {data.heading}
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed font-light">
                {data.intro}
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href={`https://wa.me/5549998362864?text=${encodeURIComponent(data.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto btn-primary bg-emerald-500 hover:bg-emerald-600 text-white border-none text-lg px-8 py-4 shadow-lg shadow-emerald-500/30 group flex items-center justify-center"
                >
                  <Phone size={20} className="mr-2 group-hover:animate-wiggle" aria-hidden="true" />
                  Reservar Equipamento
                </a>
                <a
                  href="#beneficios"
                  className="w-full sm:w-auto btn-outline-light text-lg px-8 py-4 flex items-center justify-center"
                >
                  Ver Benefícios
                  <ArrowRight size={20} className="ml-2" aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats Section - Flutuante */}
      <section className="relative z-30 -mt-12 mx-4 md:mx-auto max-w-6xl">
        <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {data.stats.map((stat, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="text-center md:text-left flex items-center justify-center md:justify-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
                    <Sparkles className="text-emerald-500" size={32} />
                  </div>
                  <div>
                    <span className="block text-4xl font-black text-slate-900 mb-1">
                      {stat.value}{stat.suffix}
                    </span>
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Benefícios (Substituindo a calculadora) */}
      <section id="beneficios" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                Por que alugar conosco?
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                Tudo o que você precisa para oferecer o melhor tratamento de Lifting Não Cirúrgico, sem se preocupar com logística ou depreciação de equipamentos caros.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {data.benefits.map((benefit, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition-all duration-300 h-full">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 text-white shadow-md">
                    <CheckCircle size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Como o HIFU age na pele (Skin Diagram) */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-emerald-500 font-bold tracking-wider uppercase text-sm mb-4 block">Tecnologia Avançada</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                O Padrão Ouro em Rejuvenescimento
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                Mostre para seus pacientes como o Ultrassom Microfocado (HIFU) atinge a camada SMAS, promovendo um efeito lifting real de dentro para fora.
              </p>
            </div>
          </Reveal>
          
          <Reveal delay={200}>
            <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-8 md:p-16 shadow-2xl border border-slate-800">
              <SkinDiagram />
            </div>
          </Reveal>
        </div>
      </section>

      {/* O que está incluso (Passo a passo simplificado) */}
      <section className="py-24 bg-slate-900 text-white relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <Reveal>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                  Suporte completo no seu HIFU Day
                </h2>
                <div className="space-y-6 text-lg text-slate-300">
                  {data.paragraphs.map((p, i) => (
                    <p key={i} className="leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="space-y-6 relative">
              {data.steps.map((step, i) => (
                <Reveal key={i} delay={i * 150}>
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex gap-6 items-start hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xl shadow-lg">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                      <p className="text-slate-400 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ B2B */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                Dúvidas Frequentes
              </h2>
              <p className="text-lg text-slate-600">
                Tudo o que você precisa saber antes de reservar a máquina para a sua clínica.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="max-w-3xl mx-auto space-y-4">
            {data.faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500' : 'border-slate-200 shadow-sm hover:border-emerald-300'
                  }`}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full px-6 py-6 text-left flex justify-between items-center outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    aria-expanded={isOpen}
                  >
                    <span className={`font-semibold pr-4 text-base md:text-lg ${isOpen ? 'text-emerald-700' : 'text-slate-800'}`}>
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={24}
                      className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-600' : 'text-slate-400'}`}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-[500px] opacity-100 pb-6' : 'max-h-0 opacity-0 pb-0'
                    }`}
                  >
                    <p className="text-slate-600 text-base leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default HifuRentalDetails;
