import React, { useState, memo, useCallback } from 'react';
import { CheckCircle, ArrowRight, Video, Play, X, Clock, Award, Sparkles } from 'lucide-react';
import { videos, images } from '../assets';
import { useIntersectionObserver, useLazyImage } from '../utils/hooks';

// Componente VideoCard otimizado com skeleton loading
const VideoCard = memo(({ video, index, onClick }) => {
  const { targetRef: imageRef, imageSrc, isLoaded, hasError } = useLazyImage(video.thumbnail);

  return (
    <div 
      ref={imageRef}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-8 hover:scale-105 hover:rotate-1 card-professional magnetic-3d"
      onClick={onClick}
      style={{
        animationDelay: `${index * 150}ms`,
      }}
    >
      <div className="relative">
        {/* Image Skeleton */}
        {!isLoaded && !hasError && (
          <div className="w-full h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer flex items-center justify-center">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <div className="text-gray-500 text-sm font-medium">Carregando...</div>
            </div>
          </div>
        )}
        
        {/* Error State */}
        {hasError && (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center text-gray-500">
              <Video size={40} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">Imagem não disponível</p>
            </div>
          </div>
        )}

        {/* Actual Image */}
        {imageSrc && (
          <img 
            src={imageSrc} 
            alt={video.title}
            className={`w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
          />
        )}
        
        {isLoaded && !hasError && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 group-hover:scale-125 group-hover:bg-blue-600 transition-all duration-500 group-hover:animate-bounce shadow-lg">
                <Play className="text-blue-600 group-hover:text-white" size={32} fill="currentColor" />
              </div>
            </div>
            <div className="absolute top-4 right-4 bg-blue-600/90 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <Clock size={14} />
              {video.duration}
            </div>
            <div className="absolute bottom-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-full">
              {video.icon}
            </div>
          </>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
          {video.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {video.description}
        </p>
        <div className="mt-4 flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-3 group-hover:scale-110 transition-all duration-300">
          Assistir Vídeo <ArrowRight size={16} className="ml-1 group-hover:animate-bounce" />
        </div>
      </div>
    </div>
  );
});

VideoCard.displayName = 'VideoCard';

const HifuSection = memo(() => {
  const [activeVideo, setActiveVideo] = useState(null);
  const { targetRef } = useIntersectionObserver();

  const openVideoModal = useCallback((video) => {
    setActiveVideo(video);
  }, []);

  const closeVideoModal = useCallback(() => {
    setActiveVideo(null);
  }, []);

  const hifuBenefits = [
    'Lifting facial não invasivo',
    'Estimula produção natural de colágeno',
    'Sem tempo de recuperação',
    'Resultados progressivos e duradouros',
    'Tecnologia FDA aprovada',
    'Procedimento seguro e eficaz'
  ];

  const videoOptions = [
    {
      id: 'hifu',
      title: 'Demonstração Completa HIFU',
      description: 'Veja passo a passo como o procedimento HIFU é realizado',
      duration: '3:45',
      thumbnail: images.consultorio1,
      video: videos.hifu,
      icon: <Video className="text-blue-500" size={24} />
    },
    {
      id: 'hifuAtendimento',
      title: 'Atendimento e Consulta',
      description: 'Conheça como é o atendimento personalizado',
      duration: '2:30',
      thumbnail: images.pai,
      video: videos.hifuAtendimento,
      icon: <Award className="text-emerald-500" size={24} />
    },
    {
      id: 'hifuDois',
      title: 'Resultados e Depoimentos',
      description: 'Veja os resultados reais dos nossos pacientes',
      duration: '4:15',
      thumbnail: images.consultorio2,
      video: videos.hifuDois,
      icon: <Sparkles className="text-purple-500" size={24} />
    }
  ];

  return (
    <section ref={targetRef} id="hifu" className="py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Particles */}
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-gradient-to-br from-slate-200/30 to-gray-300/30 rounded-full animate-float opacity-40"></div>
        <div className="absolute top-1/3 -left-20 w-64 h-64 bg-gradient-to-br from-gray-300/30 to-slate-300/30 rounded-full animate-bounce-soft opacity-40 delay-500"></div>
        <div className="absolute bottom-20 right-1/3 w-56 h-56 bg-gradient-to-br from-slate-300/30 to-gray-200/30 rounded-full animate-pulse-soft opacity-40 delay-1000"></div>
        <div className="absolute top-20 left-1/4 w-40 h-40 bg-gradient-to-br from-gray-200/30 to-slate-200/30 rounded-full animate-particle opacity-30 delay-700"></div>
        
        {/* Moving Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-4 h-full">
            {Array.from({length: 60}).map((_, i) => (
              <div key={i} className={`bg-slate-400 rounded-full w-2 h-2 animate-pulse`} style={{animationDelay: `${i * 0.1}s`}}></div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-600 font-bold mb-4 inline-block text-lg">
            ⚡ TECNOLOGIA REVOLUCIONÁRIA
          </span>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            HIFU - Ultrassom 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-600">
              {" "}Microfocado
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Tecnologia revolucionária para lifting facial não invasivo. 
            O futuro do rejuvenescimento está aqui com resultados comprovados e aprovação científica!
          </p>
        </div>

        {/* Enhanced Video Gallery with Skeleton Loading */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {videoOptions.map((video, index) => (
            <VideoCard 
              key={video.id}
              video={video}
              index={index}
              onClick={() => openVideoModal(video)}
            />
          ))}
        </div>

        {/* Benefits Section with Dr. Adriano */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Dr. Adriano Photo */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-700 rounded-3xl transform rotate-3 opacity-20"></div>
            <div className="relative bg-white p-6 rounded-3xl shadow-xl">
              <div className="relative overflow-hidden rounded-2xl">
                <img 
                  src={images.paidois} 
                  alt="Dr. Adriano Camillo - Especialista HIFU" 
                  className="w-full h-96 object-cover object-center rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-1">Dr. Adriano Camillo</h3>
                <p className="text-slate-600 font-medium">Especialista em HIFU</p>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-slate-700 to-slate-800 text-white p-4 rounded-2xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm">Procedimentos</div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Video size={32} className="text-blue-600" />
                O que é o HIFU?
              </h4>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                Tecnologia de Ultrassom Microfocado que promove lifting facial não invasivo, 
                estimulando a produção natural de colágeno nas camadas profundas da pele.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {hifuBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg hover:from-blue-100 hover:to-emerald-100 transition-colors">
                    <CheckCircle size={20} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced CTA */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-800 rounded-3xl transform rotate-1 opacity-20"></div>
          <div className="relative bg-gradient-to-r from-slate-700 to-slate-800 text-white p-12 rounded-3xl shadow-2xl text-center overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 left-0 w-full h-full opacity-30">
              <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/20 rounded-full animate-bounce delay-1000"></div>
              <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-white/20 rounded-full animate-ping delay-500"></div>
              <div className="absolute bottom-1/3 left-1/4 w-14 h-14 bg-white/20 rounded-full animate-float delay-300"></div>
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Sparkles className="text-yellow-300 animate-pulse" size={32} />
                <h3 className="text-3xl font-bold animate-gradient-text">
                  Pronto para transformar sua aparência?
                </h3>
                <Sparkles className="text-yellow-300 animate-pulse" size={32} />
              </div>
              <p className="text-slate-200 mb-8 text-lg max-w-3xl mx-auto leading-relaxed">
                Agende sua consulta e descubra como o HIFU pode rejuvenescer seu rosto 
                de forma natural e sem cirurgia. Resultados visíveis em uma única sessão!
              </p>
              <button 
                onClick={() => window.open('https://wa.me/5549998362864', '_blank')}
                className="bg-white text-slate-700 px-12 py-6 rounded-full font-bold text-xl hover:shadow-2xl hover:scale-110 hover:-translate-y-2 transition-all duration-500 inline-flex items-center gap-3 group professional-hover animate-glow"
              >
                <span className="group-hover:animate-pulse">Agendar Consulta HIFU</span>
                <ArrowRight size={24} className="group-hover:translate-x-3 group-hover:scale-125 transition-all duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Video Modal with Loading State */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="relative w-full max-w-5xl">
            <button 
              onClick={closeVideoModal}
              className="absolute -top-16 right-0 text-white hover:text-red-400 hover:scale-125 transition-all duration-300 bg-red-600/80 rounded-full p-3 hover:bg-red-500"
            >
              <X size={28} />
            </button>
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
              {/* Video Loading Skeleton */}
              <div className="aspect-video relative bg-gray-200">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer opacity-50"></div>
                <video 
                  className="w-full h-full relative z-10 bg-gray-100"
                  controls 
                  autoPlay
                  src={activeVideo.video}
                  onLoadStart={() => {
                    // Show skeleton while loading
                    const skeleton = document.querySelector('.video-skeleton');
                    if (skeleton) skeleton.classList.remove('hidden');
                  }}
                  onCanPlay={() => {
                    // Hide skeleton when ready
                    const skeleton = document.querySelector('.video-skeleton');
                    if (skeleton) skeleton.classList.add('hidden');
                  }}
                >
                  Seu navegador não suporta o elemento de vídeo.
                </video>
                {/* Video Loading Skeleton Overlay */}
                <div className="video-skeleton absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-emerald-100">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full animate-spin mx-auto flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-full"></div>
                    </div>
                    <p className="text-gray-600 font-medium">Carregando vídeo...</p>
                    <div className="flex space-x-1 justify-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-gradient-to-r from-blue-50 to-emerald-50">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full text-white">
                    {activeVideo.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{activeVideo.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{activeVideo.description}</p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span>Ao vivo</span>
                      </div>
                      <span>•</span>
                      <span>Duração: {activeVideo.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});

HifuSection.displayName = 'HifuSection';

export default HifuSection;