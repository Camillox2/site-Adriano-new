import React, { useState } from 'react';
import {
  Phone,
  CheckCircle,
  TrendingUp,
  ShieldCheck,
  Zap,
  Target,
  ArrowRight,
  Calculator,
  ChevronDown
} from 'lucide-react';
import { SITE, WHATSAPP_DEFAULT } from '../utils/constants';
import Reveal from '../components/Reveal';
import SkinDiagram from '../components/SkinDiagram';

const ROICalculator = () => {
  const [patients, setPatients] = useState(5);
  const ticket = 1200; // Ticket médio hipotético por paciente
  const rentalCost = 1500; // Custo hipotético da locação (pode variar, é só um exemplo)

  const revenue = patients * ticket;
  const profit = revenue - rentalCost;

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-slate-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
          <Calculator className="text-primary-700" size={24} aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Simulador de Lucratividade</h3>
          <p className="text-sm text-slate-500">Veja o potencial de faturamento em 1 dia (HIFU Day)</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="patients" className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
            <span>Pacientes agendados no dia</span>
            <span className="text-primary-700">{patients} pacientes</span>
          </label>
          <input
            id="patients"
            type="range"
            min="1"
            max="15"
            value={patients}
            onChange={(e) => setPatients(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Faturamento Bruto
            </span>
            <span className="block text-2xl font-bold text-slate-900">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(revenue)}
            </span>
            <span className="block text-[10px] text-slate-400 mt-1">* Considerando ticket médio de R$ 1.200</span>
          </div>
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
            <span className="block text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
              Lucro Líquido Estimado
            </span>
            <span className="block text-2xl font-bold text-emerald-700">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(profit)}
            </span>
            <span className="block text-[10px] text-emerald-500/70 mt-1">* Subtraindo custo médio de locação</span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <a
            href={WHATSAPP_DEFAULT}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            Quero orçar minha locação
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
};

const HifuRentalDetails = ({ data }) => {
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <main className="min-h-screen bg-slate-50 pt-20">
      {/* Hero Section B2B */}
      <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-primary-900/40 to-slate-900/90 z-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-600/20 via-slate-900/0 to-slate-900/0"></div>
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold tracking-widest uppercase mb-6">
                <Target size={16} aria-hidden="true" />
                {data.eyebrow}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {data.heading}
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                {data.intro}
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`https://wa.me/5549998362864?text=${encodeURIComponent(data.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto btn-primary bg-emerald-500 hover:bg-emerald-600 text-white border-none text-lg px-8 py-4 shadow-lg shadow-emerald-500/30 group"
                >
                  <Phone size={20} className="mr-2 group-hover:animate-wiggle" aria-hidden="true" />
                  Consultar Disponibilidade
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-slate-100 relative z-30 -mt-8 mx-4 md:mx-auto max-w-6xl rounded-3xl shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
          {data.stats.map((stat, i) => (
            <Reveal key={i} delay={i * 150}>
              <div className="text-center">
                <span className="block text-3xl md:text-4xl font-bold text-primary-700 mb-1">
                  {stat.value}{stat.suffix}
                </span>
                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Main Content & ROI */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Texto e Benefícios */}
            <div className="lg:col-span-7 space-y-12">
              <Reveal>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                    {data.sectionTitle}
                  </h2>
                  <div className="prose prose-lg prose-slate max-w-none text-slate-600">
                    {data.paragraphs.map((p, i) => (
                      <p key={i} className="mb-4 leading-relaxed">{p}</p>
                    ))}
                  </div>
                </div>
              </Reveal>

              <div className="grid sm:grid-cols-2 gap-6">
                {data.highlights.map((h, i) => {
                  const Icon = h.icon === 'TrendingUp' ? TrendingUp : ShieldCheck;
                  return (
                    <Reveal key={i} delay={i * 100}>
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-4 items-start h-full">
                        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                          <Icon className="text-emerald-600" size={24} aria-hidden="true" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 mb-1">{h.title}</h4>
                          <p className="text-sm text-slate-600 leading-relaxed">{h.text}</p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>

              <Reveal>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Como funciona a locação?</h3>
                  <div className="space-y-4">
                    {data.steps.map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center shrink-0">
                          {i + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 mb-1">{step.title}</h4>
                          <p className="text-slate-600 text-sm">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Sidebar B2B (ROI Calculator & Included) */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
              <Reveal delay={200}>
                <ROICalculator />
              </Reveal>

              <Reveal delay={300}>
                <div className="bg-primary-900 text-white rounded-3xl p-6 md:p-8 shadow-xl">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Zap className="text-emerald-400" size={24} aria-hidden="true" />
                    O que está incluso
                  </h3>
                  <ul className="space-y-4">
                    {data.benefits.map((benefit, i) => (
                      <li key={i} className="flex gap-3">
                        <CheckCircle className="text-emerald-400 shrink-0 mt-1" size={20} aria-hidden="true" />
                        <div>
                          <span className="block font-semibold text-white">{benefit.title}</span>
                          <span className="block text-sm text-primary-200 mt-0.5 leading-relaxed">
                            {benefit.description}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* Como o HIFU age na pele (Skin Diagram) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Tecnologia de Ponta na sua Clínica
              </h2>
              <p className="text-lg text-slate-600">
                O Ultrassom Microfocado (HIFU) atinge as camadas mais profundas da pele, incluindo o SMAS, promovendo lifting não cirúrgico real.
              </p>
            </div>
          </Reveal>
          
          <Reveal delay={200}>
            <div className="max-w-5xl mx-auto">
              <SkinDiagram />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ B2B */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Dúvidas Frequentes sobre a Locação
              </h2>
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
                    isOpen ? 'border-primary-300 shadow-md' : 'border-slate-100 shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    aria-expanded={isOpen}
                  >
                    <span className={`font-semibold pr-4 text-sm md:text-base ${isOpen ? 'text-primary-700' : 'text-slate-800'}`}>
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary-600' : 'text-slate-400'}`}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-[500px] opacity-100 pb-5' : 'max-h-0 opacity-0 pb-0'
                    }`}
                  >
                    <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
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
