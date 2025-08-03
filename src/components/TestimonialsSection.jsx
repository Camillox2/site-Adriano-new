import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const testimonials = [
    {
      name: 'Maria Silva',
      age: 45,
      treatment: 'HIFU',
      rating: 5,
      text: 'Resultado incrível! O Dr. Adriano é muito profissional e o procedimento HIFU superou minhas expectativas. Minha pele ficou mais firme e jovem de forma natural. Recomendo!',
      location: 'São Lourenço do Oeste'
    },
    {
      name: 'João Santos',
      age: 52,
      treatment: 'Implantes',
      rating: 5,
      text: 'Excelente profissional! Meu implante ficou perfeito e o atendimento foi excepcional. Voltei a sorrir com confiança. Muito obrigado, Dr. Adriano!',
      location: 'Realeza'
    },
    {
      name: 'Ana Costa',
      age: 38,
      treatment: 'Harmonização Orofacial',
      rating: 5,
      text: 'Resultado natural e lindo! O Dr. Adriano tem um olhar clínico incrível. Super indico seus serviços. Me sinto muito mais confiante!',
      location: 'Ampére'
    },
    {
      name: 'Carlos Rodrigues',
      age: 28,
      treatment: 'Ortodontia',
      rating: 5,
      text: 'Tratamento ortodôntico perfeito! O Dr. Adriano foi muito atencioso durante todo o processo. Meu sorriso ficou exatamente como eu sonhava.',
      location: 'São Lourenço do Oeste'
    },
    {
      name: 'Fernanda Lima',
      age: 35,
      treatment: 'Ozonioterapia',
      rating: 5,
      text: 'A ozonioterapia me ajudou muito na recuperação pós-cirúrgica. Técnica inovadora e Dr. Adriano sempre explicando tudo com detalhes.',
      location: 'Realeza'
    },
    {
      name: 'Roberto Oliveira',
      age: 48,
      treatment: 'HIFU',
      rating: 5,
      text: 'Incrível como o HIFU pode rejuvenescer sem cirurgia! Dr. Adriano é um profissional excepcional. Resultado surpreendente e natural.',
      location: 'Ampére'
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => prev === 0 ? testimonials.length - 1 : prev - 1);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-emerald-600 to-slate-600 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white rounded-full animate-bounce"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="bg-white bg-opacity-20 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
            ⭐ DEPOIMENTOS
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            O que nossos pacientes dizem
          </h2>
          <p className="text-emerald-100 text-xl max-w-3xl mx-auto">
            A satisfação e confiança dos nossos pacientes são nossa maior conquista
          </p>
        </div>
        
        {/* Main Testimonial */}
        <div className="relative max-w-5xl mx-auto mb-12">
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Quote Icon */}
              <div className="lg:col-span-1 text-center lg:text-left">
                <Quote className="text-emerald-600 mx-auto lg:mx-0 mb-4" size={64} />
                <div className="flex justify-center lg:justify-start mb-4">
                  {[...Array(testimonials[currentTestimonialIndex].rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-500 fill-current" size={24} />
                  ))}
                </div>
              </div>
              
              {/* Testimonial Content */}
              <div className="lg:col-span-2">
                <p className="text-xl lg:text-2xl text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonials[currentTestimonialIndex].text}"
                </p>
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-lg font-bold text-gray-800">
                    {testimonials[currentTestimonialIndex].name}
                  </h4>
                  <div className="flex flex-wrap gap-4 text-gray-600 mt-2">
                    <span>📍 {testimonials[currentTestimonialIndex].location}</span>
                    <span>🦷 {testimonials[currentTestimonialIndex].treatment}</span>
                    <span>👤 {testimonials[currentTestimonialIndex].age} anos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 rounded-full p-4 shadow-lg hover:shadow-xl transition-all hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 rounded-full p-4 shadow-lg hover:shadow-xl transition-all hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-3 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonialIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentTestimonialIndex 
                  ? 'bg-white w-8' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>

        {/* All Testimonials Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              onClick={() => setCurrentTestimonialIndex(index)}
              className={`bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                index === currentTestimonialIndex 
                  ? 'bg-opacity-20 border-2 border-white' 
                  : 'hover:bg-opacity-15'
              }`}
            >
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={16} />
                ))}
              </div>
              <p className="text-white text-sm mb-4 line-clamp-3">
                "{testimonial.text.substring(0, 100)}..."
              </p>
              <div>
                <h5 className="text-white font-semibold text-sm">{testimonial.name}</h5>
                <p className="text-emerald-200 text-xs">{testimonial.treatment} • {testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-2xl max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Seja nosso próximo paciente satisfeito!
            </h3>
            <p className="text-emerald-100 mb-6">
              Junte-se aos centenas de pacientes que já transformaram seus sorrisos 
              e autoestima conosco. Agende sua consulta hoje mesmo!
            </p>
            <button 
              onClick={() => window.open('https://wa.me/5549998362864', '_blank')}
              className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
            >
              📱 Quero ser o próximo!
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;