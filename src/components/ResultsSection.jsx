import React, { useState } from 'react';
import { createPortal } from 'react-dom';
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
import { images as globalImages } from '../assets';

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
  {
    id: 9,
    category: 'harmonizacao',
    categoryLabel: 'Harmonização Orofacial',
    title: 'Preenchimento Labial',
    description: 'Contorno e volume natural alcançados com técnica segura de preenchimento.',
    image: globalImages.preenchimento_labial_1,
    hasBeforeAfter: true,
  },
  {
    id: 10,
    category: 'harmonizacao',
    categoryLabel: 'Harmonização Orofacial',
    title: 'Lifting Facial',
    description: 'Efeito lifting não cirúrgico para rejuvenescimento global do rosto.',
    image: globalImages.lifting_facial,
    hasBeforeAfter: true,
  },
  {
    id: 11,
    category: 'harmonizacao',
    categoryLabel: 'Lipo de Papada',
    title: 'Lipoaspiração de Papada HD',
    description: 'Eliminação da gordura submentoniana e definição do contorno da mandíbula.',
    image: globalImages.lipo_papada,
    hasBeforeAfter: true,
  },
  {
    id: 12,
    category: 'botox',
    categoryLabel: 'Botox / Toxina Botulínica',
    title: 'Tratamento Preventivo com Botox',
    description: 'Suavização das linhas de expressão garantindo um visual descansado.',
    image: globalImages.botox_1,
    hasBeforeAfter: true,
  },
  {
    id: 13,
    category: 'implantes',
    categoryLabel: 'Implantes Dentários',
    title: 'Reabilitação com Prótese Protocolo',
    description: 'Recuperação funcional e estética completa com fixação sobre implantes.',
    image: globalImages.implante_dentario_1,
    hasBeforeAfter: true,
  },
];

const CATEGORIES = [
  { id: 'todos', label: 'Todos os Resultados' },
  { id: 'preenchimento', label: 'Preenchimento Labial' },
  { id: 'botox', label: 'Botox / Toxina Botulínica' },
  { id: 'harmonizacao', label: 'Harmonização Orofacial' },
  { id: 'implantes', label: 'Implantes Dentários' },
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
                preload="none"
                poster={resultadoHarmonizacao1}
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

        {/* Modal de Imagem Ampliada com Portal */}
        {selectedImage && createPortal(
          <div
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-md flex items-center justify-center z-[99999] p-2 sm:p-6 animate-fade-in overflow-y-auto"
            onClick={() => setSelectedImage(null)}
            role="dialog"
            aria-modal="true"
          >
            {/* Botão de Fechar Fixo Flutuante */}
            <button
              onClick={() => setSelectedImage(null)}
              className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[100000] bg-emerald-600 hover:bg-emerald-500 text-white rounded-full p-3 shadow-2xl transition-transform active:scale-95 flex items-center gap-1.5 font-bold text-sm border border-white/20 cursor-pointer"
              aria-label="Fechar modal"
            >
              <X size={22} />
              <span className="hidden sm:inline pr-1">Fechar</span>
            </button>

            <div
              className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl my-auto border border-slate-100 flex flex-col max-h-[92vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Barra de Cabeçalho do Modal com Botão de Fechar Explicito */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50/90 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                    {selectedImage.categoryLabel}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-1.5 rounded-full text-xs transition-colors flex items-center gap-1 cursor-pointer shadow-sm"
                >
                  <span>Fechar</span>
                  <X size={16} />
                </button>
              </div>

              {/* Imagem principal */}
              <div className="relative flex-1 min-h-0 bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="max-h-[55vh] sm:max-h-[65vh] w-auto object-contain mx-auto"
                />
              </div>

              <div className="p-5 sm:p-6 bg-white shrink-0">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5">
                  {selectedImage.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {selectedImage.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-between items-center pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                    <span>Imagens autorizadas de pacientes reais do consultório</span>
                  </div>
                  <a
                    href={WHATSAPP_DEFAULT}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs w-full sm:w-auto text-center"
                  >
                    Quero agendar uma consulta
                  </a>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

        {/* Modal de Vídeo Ampliado com Portal */}
        {isVideoModalOpen && createPortal(
          <div
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-md flex items-center justify-center z-[99999] p-3 sm:p-6 animate-fade-in overflow-y-auto"
            onClick={() => setIsVideoModalOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            {/* Botão de Fechar Fixo na Tela */}
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[100000] bg-emerald-600 hover:bg-emerald-500 text-white rounded-full p-3 shadow-2xl transition-transform active:scale-95 flex items-center gap-1.5 font-bold text-sm border border-white/20 cursor-pointer"
              aria-label="Fechar vídeo"
            >
              <X size={22} />
              <span className="hidden sm:inline pr-1">Fechar</span>
            </button>

            <div
              className="relative max-w-2xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl my-auto border border-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Bar for Video Modal */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950 shrink-0">
                <span className="text-xs font-bold uppercase text-emerald-400 tracking-wider">
                  Vídeo de Paciente Real
                </span>
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1 rounded-full text-xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Fechar</span>
                  <X size={14} />
                </button>
              </div>
              <div className="aspect-[9/16] max-h-[70vh] mx-auto bg-black">
                <video
                  src={antesEDepoisVideo}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </section>
  );
};

export default ResultsSection;
