import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import atendimento from '../assets/images/consultorio/atendimento.webp';
import salaAtendimento1 from '../assets/images/consultorio/sala-atendimento-1.webp';
import recepcao1 from '../assets/images/consultorio/recepcao-1.webp';
import salaAtendimento2 from '../assets/images/consultorio/sala-atendimento-2.webp';
import cadeiraOdontologica from '../assets/images/consultorio/cadeira-odontologica.webp';
import recepcao2 from '../assets/images/consultorio/recepcao-2.webp';

const PHOTOS = [
  { src: recepcao2, alt: 'Recepção do consultório do Dr. Adriano Camillo em São Lourenço do Oeste', position: 'center' },
  { src: salaAtendimento1, alt: 'Sala de atendimento odontológico com cadeira e equipamentos', position: 'center' },
  { src: atendimento, alt: 'Dr. Adriano Camillo atendendo um paciente no consultório', position: '75% center' },
  { src: recepcao1, alt: 'Sala de espera do consultório odontológico', position: 'center' },
  { src: salaAtendimento2, alt: 'Consultório odontológico com cadeira e bancada de atendimento', position: 'center' },
  { src: cadeiraOdontologica, alt: 'Cadeira odontológica do consultório', position: 'center' },
];

const N = PHOTOS.length;

// Distância circular entre a foto i e a ativa (-N/2..N/2)
const offsetOf = (i, active) => {
  let d = i - active;
  if (d > N / 2) d -= N;
  if (d < -N / 2) d += N;
  return d;
};

const OfficeGallerySection = () => {
  const [active, setActive] = useState(0);
  const touchX = useRef(null);
  const go = (step) => setActive((a) => (a + step + N) % N);

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  return (
    <section id="consultorio" className="section bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <span className="section-eyebrow">Nosso consultório</span>
          <h2 className="section-title mt-5">
            Um espaço pensado para o seu <span className="text-primary-700">conforto</span>
          </h2>
          <p className="section-subtitle mt-5">
            Recepção e salas de atendimento no Centro de São Lourenço do Oeste.
          </p>
        </div>

        <div
          className="relative mx-auto h-[23rem] sm:h-[26rem] md:h-[28rem] max-w-5xl select-none touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="region"
          aria-roledescription="carrossel"
          aria-label="Fotos do consultório"
        >
          {PHOTOS.map(({ src, alt, position }, i) => {
            const d = offsetOf(i, active);
            const abs = Math.abs(d);
            const visible = abs <= 1;
            const style = {
              transform: `translateX(calc(-50% + ${d * 62}%)) scale(${d === 0 ? 1 : 0.8})`,
              opacity: d === 0 ? 1 : visible ? 0.55 : 0,
              zIndex: 30 - abs * 10,
              pointerEvents: visible ? 'auto' : 'none',
            };
            return (
              <button
                key={src}
                type="button"
                onClick={() => d !== 0 && setActive(i)}
                tabIndex={visible ? 0 : -1}
                aria-label={d === 0 ? alt : `Ver foto: ${alt}`}
                aria-current={d === 0}
                style={style}
                className="absolute left-1/2 top-0 h-full aspect-[4/5] max-w-[78%] overflow-hidden rounded-2xl shadow-xl bg-slate-100 transition-all duration-500 ease-out"
              >
                <img
                  src={src}
                  alt={alt}
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="500"
                  draggable="false"
                  style={{ objectPosition: position }}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Foto anterior"
            className="hidden md:flex absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 items-center justify-center rounded-full bg-white/90 shadow-lg text-slate-800 hover:bg-white"
          >
            <ChevronLeft size={24} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Próxima foto"
            className="hidden md:flex absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 items-center justify-center rounded-full bg-white/90 shadow-lg text-slate-800 hover:bg-white"
          >
            <ChevronRight size={24} aria-hidden="true" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {PHOTOS.map(({ src }, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ir para a foto ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${i === active ? 'w-6 bg-primary-700' : 'w-2.5 bg-slate-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfficeGallerySection;
