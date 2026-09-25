import React from 'react';
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

const OfficeGallerySection = () => (
  <section id="consultorio" className="section bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
        <span className="section-eyebrow">Nosso consultório</span>
        <h2 className="section-title mt-5">
          Um espaço pensado para o seu <span className="text-primary-700">conforto</span>
        </h2>
        <p className="section-subtitle mt-5">
          Recepção e salas de atendimento no Centro de São Lourenço do Oeste.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
        {PHOTOS.map(({ src, alt, position }) => (
          <div key={src} className="overflow-hidden rounded-2xl shadow-md bg-slate-100 aspect-[4/5]">
            <img
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              width="400"
              height="500"
              style={{ objectPosition: position }}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default OfficeGallerySection;
