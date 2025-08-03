import React, { useState, memo, useRef, useEffect } from 'react';
import { ArrowRight, X, CheckCircle, Phone, Heart, Smile, Syringe } from 'lucide-react';

// Componente ServiceCard 3D magnético otimizado
const ServiceCard = memo(({ service, onModalOpen }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      if (!isHovered) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        translateZ(20px)
        scale3d(1.02, 1.02, 1.02)
      `;
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      card.style.transition = 'transform 0.1s ease-out';
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      card.style.transition = 'transform 0.5s ease-out';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isHovered]);

  return (
    <div 
      ref={cardRef}
      className="magnetic-card bg-gradient-to-br from-white via-blue-50/30 to-emerald-50/30 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-blue-100/50 backdrop-blur-sm"
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-8 left-6 w-1 h-1 bg-emerald-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="relative p-8 h-full flex flex-col">
        {/* Floating Icon with glow effect */}
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-emerald-400/20 rounded-full blur-xl scale-150 group-hover:scale-200 transition-transform duration-500"></div>
          <div className="relative transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 group-hover:animate-bounce">
            {service.icon}
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors">
            {service.description}
          </p>
        </div>
        
        {/* Animated CTA Button */}
        <button 
          onClick={() => onModalOpen(service)}
          className="relative w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-emerald-700 transition-all duration-500 flex items-center justify-center gap-2 group/btn overflow-hidden"
        >
          {/* Button animation background */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
          
          <span className="relative z-10 group-hover/btn:scale-105 transition-transform">Saiba Mais</span>
          <ArrowRight 
            size={16} 
            className="relative z-10 group-hover/btn:translate-x-2 group-hover/btn:scale-125 transition-all duration-300" 
          />
        </button>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        <div className="absolute bottom-0 right-0 w-1 h-full bg-gradient-to-t from-blue-500 to-emerald-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom"></div>
      </div>
    </div>
  );
});

ServiceCard.displayName = 'ServiceCard';

const ServicesSection = () => {
  const [activeModal, setActiveModal] = useState(null);

  const services = [
    {
      id: 'ortodontia',
      icon: <Smile className="w-12 h-12 text-blue-600" />,
      title: 'Ortodontia',
      description: 'Correção do posicionamento dos dentes e mordida',
      shortDescription: 'Aparelhos modernos para o sorriso perfeito',
      fullDescription: 'Tratamento especializado para correção da posição dos dentes e mordida, utilizando aparelhos convencionais, estéticos e ortodontia digital com planejamento 3D. Nossa abordagem moderna garante resultados eficazes e confortáveis.',
      benefits: [
        'Melhora significativa da estética do sorriso',
        'Correção da mordida e função mastigatória',
        'Facilita a higienização bucal',
        'Previne problemas na ATM',
        'Aumenta a autoestima e confiança',
        'Planejamento digital 3D',
        'Aparelhos estéticos disponíveis',
        'Acompanhamento personalizado'
      ],
      process: [
        'Consulta e avaliação inicial',
        'Planejamento digital 3D',
        'Instalação do aparelho',
        'Acompanhamento mensal',
        'Finalização e contenção'
      ]
    },
    {
      id: 'implantes',
      icon: <Heart className="w-12 h-12 text-emerald-600" />,
      title: 'Implantes Dentais',
      description: 'Reposição de dentes perdidos com tecnologia de ponta',
      shortDescription: 'Solução definitiva para dentes perdidos',
      fullDescription: 'Cirurgia de implantes dentários com tecnologia de ponta e materiais de alta qualidade. Utilizamos implantes de titânio e técnicas minimamente invasivas para reposição de dentes perdidos, garantindo funcionalidade e estética naturais.',
      benefits: [
        'Restaura completamente a função mastigatória',
        'Estética completamente natural',
        'Preserva o osso alveolar',
        'Durabilidade de décadas',
        'Não afeta dentes adjacentes',
        'Melhora a qualidade de vida',
        'Tecnologia de ponta',
        'Materiais biocompatíveis'
      ],
      process: [
        'Avaliação e planejamento',
        'Exames de imagem 3D',
        'Cirurgia de implante',
        'Período de osseointegração',
        'Colocação da prótese'
      ]
    },
    {
      id: 'harmonizacao',
      icon: <Syringe className="w-12 h-12 text-blue-600" />,
      title: 'Harmonização Orofacial',
      description: 'Rejuvenescimento facial não cirúrgico',
      shortDescription: 'Beleza natural sem cirurgia',
      fullDescription: 'Procedimentos estéticos faciais utilizando técnicas avançadas como preenchimento com ácido hialurônico, toxina botulínica e bioestimuladores. Nosso foco é sempre na harmonia e naturalidade dos resultados.',
      benefits: [
        'Rejuvenescimento facial natural',
        'Melhora significativa da autoestima',
        'Procedimento minimamente invasivo',
        'Resultados imediatos e naturais',
        'Sem tempo de recuperação',
        'Técnicas seguras e aprovadas',
        'Produtos de alta qualidade',
        'Resultados harmoniosos'
      ],
      process: [
        'Consulta e análise facial',
        'Planejamento personalizado',
        'Aplicação dos produtos',
        'Acompanhamento pós-procedimento',
        'Manutenção conforme necessário'
      ]
    }
  ];

  const Modal = ({ service, onClose }) => (
    <div className="fixed inset-0 bg-blue-900/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              {service.icon}
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{service.title}</h2>
                <p className="text-gray-600">{service.shortDescription}</p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-8">
            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Sobre o Tratamento</h3>
              <p className="text-gray-600 text-lg leading-relaxed">{service.fullDescription}</p>
            </div>
            
            {/* Benefits */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Benefícios</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {service.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                    <span className="text-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Process */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Como Funciona</h3>
              <div className="space-y-3">
                {service.process.map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <span className="text-gray-600">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="bg-blue-50 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Interessado neste tratamento?
              </h4>
              <p className="text-gray-600 mb-4">
                Entre em contato para agendar sua consulta e saber mais sobre valores e detalhes do tratamento.
              </p>
              <button 
                onClick={() => window.open('https://wa.me/5549998362864', '_blank')}
                className="w-full bg-emerald-600 text-white py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Phone size={20} />
                Agendar Consulta via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="servicos" className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-emerald-50/30 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Orbital Background Animation */}
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-gradient-to-br from-blue-100/30 to-emerald-100/30 rounded-full animate-orbital opacity-20"></div>
        <div className="absolute top-1/3 -left-20 w-64 h-64 bg-gradient-to-br from-emerald-100/30 to-blue-100/30 rounded-full animate-wave opacity-20"></div>
        <div className="absolute bottom-20 right-1/3 w-56 h-56 bg-gradient-to-br from-blue-200/20 to-emerald-200/20 rounded-full animate-light-pulse opacity-20"></div>
        
        {/* Moving Gradient Background */}
        <div className="absolute inset-0 animate-gradient-bg opacity-[0.01]"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-particle opacity-40"></div>
        <div className="absolute top-1/2 right-20 w-3 h-3 bg-emerald-400 rounded-full animate-float opacity-40 delay-500"></div>
        <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-blue-300 rounded-full animate-bounce-soft opacity-40 delay-1000"></div>
      </div>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 font-bold mb-4 inline-block text-lg">
            🦷 NOSSOS SERVIÇOS
          </span>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full animate-pulse-soft"></div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900">
              Tratamentos 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                Especializados
              </span>
            </h2>
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full animate-pulse-soft delay-500"></div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferecemos uma gama completa de tratamentos para sua saúde bucal e estética facial, 
            sempre com tecnologia de ponta e atendimento humanizado.
          </p>
        </div>

        {/* Enhanced 3D Magnetic Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onModalOpen={setActiveModal}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gray-100 p-8 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Não encontrou o que procura?
            </h3>
            <p className="text-gray-600 mb-6">
              Entre em contato conosco para saber sobre outros tratamentos disponíveis 
              ou para esclarecer suas dúvidas.
            </p>
            <button 
              onClick={() => window.open('https://wa.me/5549998362864', '_blank')}
              className="bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-emerald-700 transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <Phone size={20} />
              Falar com Dr. Adriano
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {activeModal && (
        <Modal service={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </section>
  );
};

export default ServicesSection;