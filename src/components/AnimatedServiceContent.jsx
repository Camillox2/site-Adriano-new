import React, { useState, useEffect } from 'react';
import { ChevronRight, Image as ImageIcon } from 'lucide-react';
import { images as globalImages } from '../assets';
import Reveal from './Reveal';

const AnimatedServiceContent = ({ page }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Fallback to empty arrays if data is missing during transition
  const images = page.images || [];
  const topicPoints = page.topicPoints || [];
  const paragraphs = page.paragraphs || [];
  const shortIntro = page.shortIntro || '';

  // Auto-slide images every 5 seconds if there are multiple
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setActiveImageIndex((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images.length]);

  return (
    <section className="section bg-slate-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-100 to-transparent pointer-events-none hidden lg:block" aria-hidden="true" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start max-w-7xl mx-auto">
          
          {/* Left Column: Text & Topics */}
          <div className="lg:col-span-3 space-y-8">
            <Reveal>
              <span className="section-eyebrow">Atendimento especializado</span>
              <h2 className="section-title mt-4">{page.sectionTitle}</h2>
              {shortIntro && (
                <p className="text-slate-600 text-lg md:text-xl mt-6 leading-relaxed font-medium">
                  {shortIntro}
                </p>
              )}
            </Reveal>

            {/* Render new Topic Points if available */}
            {topicPoints.length > 0 && (
              <div className="space-y-4 mt-8">
                {topicPoints.map((topic, idx) => (
                  <Reveal key={idx} delay={idx * 100}>
                    <div 
                      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-emerald-200 transition-colors group cursor-pointer"
                      onClick={() => images.length > 0 && setActiveImageIndex(idx % images.length)}
                    >
                      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                          <ChevronRight size={18} />
                        </span>
                        {topic.title}
                      </h3>
                      <p className="mt-3 text-slate-600 leading-relaxed ml-11">
                        {topic.text}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}

            {/* Fallback for old paragraphs during migration */}
            {topicPoints.length === 0 && paragraphs.length > 0 && (
              <div className="space-y-5 text-slate-600 leading-relaxed md:text-lg mt-8">
                {paragraphs.map((paragraph, idx) => (
                  <Reveal key={idx} delay={idx * 100}>
                    <p>{paragraph}</p>
                  </Reveal>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Dynamic Image Carousel */}
          <div className="lg:col-span-2 lg:sticky lg:top-32">
            <Reveal className="relative">
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl bg-slate-200">
                {images.length > 0 ? (
                  images.map((img, idx) => (
                    <img
                      key={idx}
                      src={globalImages[img] || img}
                      alt={`${page.label} - Galeria ${idx + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                        idx === activeImageIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading={idx === 0 ? "eager" : "lazy"}
                    />
                  ))
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-100">
                    <ImageIcon size={48} className="mb-4 opacity-50" />
                    <span className="text-sm font-medium">Imagens do Tratamento</span>
                  </div>
                )}

                {/* Badge Overlay */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md shadow-xl rounded-2xl px-6 py-3 text-center border border-white/50 whitespace-nowrap z-20 transition-transform hover:scale-105">
                  <span className="block font-bold text-slate-900">{page.label}</span>
                  <span className="block text-sm text-slate-500">
                    {images.length > 0 ? `Galeria ${activeImageIndex + 1}/${images.length}` : 'Dr. Adriano Camillo'}
                  </span>
                </div>
              </div>

              {/* Image Indicators */}
              {images.length > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        idx === activeImageIndex
                          ? 'bg-emerald-500 w-8'
                          : 'bg-slate-300 hover:bg-slate-400'
                      }`}
                      aria-label={`Ver imagem ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AnimatedServiceContent;
