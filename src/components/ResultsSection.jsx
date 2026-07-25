import React, { useState } from 'react';
import { Sparkles, Play, ZoomIn, X, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { WHATSAPP_DEFAULT } from '../utils/constants';
import Reveal from './Reveal';

// Importação das imagens reais de pacientes
import botoxTesta from '../assets/images/resultados/botox_testa_antes_depois.webp';
import preenchimentoPerfil from '../assets/images/resultados/preenchimento_labial_perfil.webp';
import harmonizacaoPerfil from '../assets/images/resultados/harmonizacao_perfil.webp';
import preenchimentoPosImediato from '../assets/images/resultados/preenchimento_labial_pos_imediato.webp';
import preenchimentoDetalhe from '../assets/images/resultados/preenchimento_labial_detalhe.webp';
import resultadoHarmonizacao1 from '../assets/images/resultados/resultado_harmonizacao_1.webp';
import resultadoHarmonizacao2 from '../assets/images/resultados/resultado_harmonizacao_2.webp';
import resultadoHarmonizacao3 from '../assets/images/resultados/resultado_harmonizacao_3.webp';

// Vídeo real
import antesEDepoisVideo from '../assets/videos/antesedepois.mp4';

const RESULTS_DATA = [
  {
    id: 1,
    category: 'botox',
    categoryLabel: 'Botox / Toxina Botulínica',
    title: 'Tratamento de Linhas de Expressão na Testa',
    description: 'Suavização expressiva das rugas dinâmicas na testa e região glabelar, mantendo a naturalidade do olhar.',
    image: botoxTesta,
    hasBeforeAfter: true,
  },
  {
    id: 2,
    category: 'preenchimento',
    categoryLabel: 'Preenchimento Labial',
    title: 'Esculturação e Volume Labial (Pós-Imediato)',
    description: 'Definição de arco do cupido e projeção volumétrica com ácido hialurônico de alta biocompatibilidade.',
    image: preenchimentoPosImediato,
    hasBeforeAfter: true,
  },
  {
    id: 3,
    category: 'harmonizacao',
    categoryLabel: 'Harmonização Orofacial',
    title: 'Alinhamento de Perfil Facial e Mento',
    description: 'Equilíbrio da linha mandibular e projeção do perfil, proporcionando contorno jovem e refinado.',
    image: harmonizacaoPerfil,
    hasBeforeAfter: true,
  },
  {
    id: 4,
    category: 'preenchimento',
    categoryLabel: 'Preenchimento Labial',
    title: 'Harmonização Labial em Perfil',
    description: 'Realce do contorno dos lábios com simetria e hidratação profunda em ângulo lateral.',
    image: preenchimentoPerfil,
    hasBeforeAfter: true,
  },
  {
    id: 5,
    category: 'preenchimento',
    categoryLabel: 'Preenchimento Labial',
    title: 'Restauração de Volume e Contorno Labial',
    description: 'Tratamento focado na simetria, definição do contorno e volume natural dos lábios.',
    image: preenchimentoDetalhe,
    hasBeforeAfter: true,
  },
  {
    id: 6,
    category: 'harmonizacao',
    categoryLabel: 'Harmonização Orofacial',
    title: 'Transformação Estética Facial',
    description: 'Combinação de procedimentos para harmonização e rejuvenescimento da simetria facial.',
    image: resultadoHarmonizacao1,
    hasBeforeAfter: true,
  },
  {
    id: 7,
    category: 'harmonizacao',
    categoryLabel: 'Harmonização Orofacial',
    title: 'Refinamento do Contorno Mandibular',
    description: 'Definição das linhas do rosto valorizando a beleza natural do paciente.',
    image: resultadoHarmonizacao2,
    hasBeforeAfter: true,
  },
  {
    id: 8,
    category: 'harmonizacao',
    categoryLabel: 'Harmonização Orofacial',
    title: 'Resultado Estético Integrado',
    description: 'Planejamento individualizado para harmonização entre sorriso e contornos faciais.',
    image: resultadoHarmonizacao3,
    hasBeforeAfter: true,
  },
];

const CATEGORIES = [
  { id: 'todos', label: 'Todos os Resultados' },
  { id: 'preenchimento', label: 'Preenchimento Labial' },
  { id: 'botox', label: 'Botox / Toxina Botulínica' },
  { id: 'harmonizacao', label: 'Harmonização Orofacial' },
];

const ResultsSection = () => {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Efeito para travar o scroll e permitir fechar modais via tecla Escape
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
        setIsVideoModalOpen(false);
      }
    };

    if (selectedImage || isVideoModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage, isVideoModalOpen]);

  const filteredResults = activeCategory === 'todos'
    ? RESULTS_DATA
    : RESULTS_DATA.filter((r) => r.category === activeCategory);

  return (
    <section id="resultados" className="section bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Cabeçalho da Seção */}
        <Reveal className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold tracking-widest uppercase mb-4">
            <Sparkles size={14} aria-hidden="true" />
            Casos Clínicos Reais
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            Transformações reais,<br className="hidden sm:inline" />
            <span className="text-emerald-600">resultados naturais</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg mt-4 leading-relaxed">
            Confira alguns dos resultados de procedimentos realizados no consultório pelo Dr. Adriano Camillo. Cada planejamento respeita a anatomia e os desejos individuais de cada paciente.
          </p>
        </Reveal>

        {/* Vídeo em Destaque */}
        <Reveal className="mb-14 md:mb-18">
          <div className="max-w-4xl mx-auto bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="relative aspect-[9/16] md:aspect-auto md:h-full max-h-[480px] bg-black flex items-center justify-center group overflow-hidden">
              <video
                src={antesEDepoisVideo}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                muted
                loop
                playsInline
                autoPlay
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="absolute inset-0 flex items-center justify-center bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors"
                aria-label="Assistir ao vídeo de transformação em tela cheia"
              >
                <span className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 p-4 rounded-full shadow-xl transform group-hover:scale-110 transition-all duration-300">
                  <Play size={28} fill="currentColor" />
                </span>
              </button>
              <span className="absolute bottom-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Vídeo de Paciente Real
              </span>
            </div>

            <div className="p-8 md:p-10 text-white">
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest block mb-2">
                Procedimento em Destaque
              </span>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-snug">
                Antes & Depois: Harmonização e Estética Facial
              </h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                Veja o efeito contínuo e a delicadeza dos resultados obtidos através da combinação de técnicas modernas de harmonização, preenchimento e estímulo de colágeno.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-slate-200 text-sm">
                  <CheckCircle className="text-emerald-400 shrink-0" size={18} />
                  <span>Procedimento realizado com anestesia local e conforto</span>
                </div>
                <div className="flex items-center gap-3 text-slate-200 text-sm">
                  <CheckCircle className="text-emerald-400 shrink-0" size={18} />
                  <span>Produtos com certificação de alta pureza e ANVISA</span>
                </div>
                <div className="flex items-center gap-3 text-slate-200 text-sm">
                  <CheckCircle className="text-emerald-400 shrink-0" size={18} />
                  <span>Acompanhamento pós-procedimento dedicado</span>
                </div>
              </div>

              <a
                href={WHATSAPP_DEFAULT}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto inline-flex justify-center text-sm"
              >
                Agende sua avaliação presencial
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </Reveal>

        {/* Filtros de Categoria */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 scale-105'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid de Fotos de Resultados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredResults.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 80}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => setSelectedImage(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedImage(item);
                  }
                }}
                aria-label={`Ver detalhes do resultado: ${item.title}`}
                className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400"
              >
                <div className="relative aspect-[4/4] overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white/90 text-slate-900 p-3 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <ZoomIn size={22} />
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-emerald-300 text-[11px] font-semibold px-3 py-1 rounded-full">
                    {item.categoryLabel}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h4 className="font-bold text-slate-900 text-base mb-1.5 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-slate-600 text-xs leading-relaxed flex-grow">
                    {item.description}
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-600 font-semibold">
                    <span>Ver em alta resolução</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Modal de Imagem Ampliada */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full p-2.5 transition-colors"
                aria-label="Fechar modal"
              >
                <X size={20} />
              </button>

              <div className="max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="max-h-[75vh] w-auto object-contain mx-auto"
                />
              </div>

              <div className="p-6 bg-white">
                <span className="text-xs font-bold uppercase text-emerald-600 tracking-wider">
                  {selectedImage.categoryLabel}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">
                  {selectedImage.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-between items-center pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <ShieldCheck size={16} className="text-emerald-600" />
                    <span>Imagens autorizadas de pacientes reais do consultório</span>
                  </div>
                  <a
                    href={WHATSAPP_DEFAULT}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs w-full sm:w-auto"
                  >
                    Quero agendar uma consulta sobre este procedimento
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Vídeo Ampliado */}
        {isVideoModalOpen && (
          <div
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in"
            onClick={() => setIsVideoModalOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="relative max-w-2xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 text-white rounded-full p-2.5 transition-colors"
                aria-label="Fechar vídeo"
              >
                <X size={20} />
              </button>

              <div className="aspect-[9/16] max-h-[80vh] mx-auto bg-black">
                <video
                  src={antesEDepoisVideo}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResultsSection;
