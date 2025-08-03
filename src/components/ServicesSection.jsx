import React, { useState } from 'react';
import { ArrowRight, X, CheckCircle, Phone } from 'lucide-react';

const ServicesSection = () => {
  const [activeModal, setActiveModal] = useState(null);

  const services = [
    {
      id: 'ortodontia',
      icon: '🦷',
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
      icon: '😀',
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
      icon: '💉',
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
    },
    {
      id: 'ozonioterapia',
      icon: '🧪',
      title: 'Ozonioterapia',
      description: 'Tratamento inovador com ozônio medicinal',
      shortDescription: 'Terapia natural e eficaz',
      fullDescription: 'Terapia inovadora utilizando ozônio medicinal para tratamento de diversas condições bucais. O ozônio acelera a cicatrização, tem ação antimicrobiana natural e reduz inflamações de forma completamente natural.',
      benefits: [
        'Acelera significativamente a cicatrização',
        'Poderosa ação antimicrobiana',
        'Reduz inflamações naturalmente',
        'Tratamento 100% natural',
        'Sem efeitos colaterais',
        'Complementa outros tratamentos',
        'Melhora a saúde geral',
        'Terapia inovadora'
      ],
      process: [
        'Avaliação da condição',
        'Preparação da área',
        'Aplicação do ozônio',
        'Acompanhamento da evolução',
        'Sessões conforme necessário'
      ]
    },
    {
      id: 'hifu',
      icon: '⚡',
      title: 'HIFU - Ultrasson Microfocado',
      description: 'Lifting facial não invasivo revolucionário',
      shortDescription: 'Tecnologia de rejuvenescimento avançada',
      fullDescription: 'Tecnologia revolucionária de Ultrasson Microfocado para lifting e rejuvenescimento facial. Estimula a produção de colágeno nas camadas profundas da pele sem necessidade de cirurgia, proporcionando resultados naturais e duradouros.',
      benefits: [
        'Lifting natural sem cirurgia',
        'Estimula produção de colágeno',
        'Sem tempo de recuperação',
        'Resultados progressivos e duradouros',
        'Tecnologia FDA aprovada',
        'Procedimento seguro e eficaz',
        'Melhora da firmeza da pele',
        'Resultados naturais'
      ],
      process: [
        'Consulta e avaliação facial',
        'Planejamento do tratamento',
        'Aplicação do HIFU',
        'Acompanhamento dos resultados',
        'Manutenção quando necessário'
      ]
    }
  ];

  const Modal = ({ service, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{service.icon}</span>
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
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <span className="text-gray-600">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Interessado neste tratamento?
              </h4>
              <p className="text-gray-600 mb-4">
                Entre em contato para agendar sua consulta e saber mais sobre valores e detalhes do tratamento.
              </p>
              <button 
                onClick={() => window.open('https://wa.me/5549998362864', '_blank')}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
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
    <section id="servicos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
            🦷 NOSSOS SERVIÇOS
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Tratamentos Especializados
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferecemos uma gama completa de tratamentos para sua saúde bucal e estética facial, 
            sempre com tecnologia de ponta e atendimento humanizado.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
            >
              <div className="p-8">
                {/* Service Icon */}
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                
                {/* Service Info */}
                <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                
                {/* Quick Benefits Preview */}
                <div className="mb-6">
                  <div className="space-y-2">
                    {service.benefits.slice(0, 3).map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-500">
                        <CheckCircle className="text-green-500" size={14} />
                        <span>{benefit}</span>
                      </div>
                    ))}
                    {service.benefits.length > 3 && (
                      <div className="text-sm text-blue-600 font-medium">
                        +{service.benefits.length - 3} benefícios adicionais
                      </div>
                    )}
                  </div>
                </div>
                
                {/* CTA Button */}
                <button 
                  onClick={() => setActiveModal(service)}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:from-blue-700 group-hover:to-green-700"
                >
                  Saiba Mais
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Não encontrou o que procura?
            </h3>
            <p className="text-gray-600 mb-6">
              Entre em contato conosco para saber sobre outros tratamentos disponíveis 
              ou para esclarecer suas dúvidas.
            </p>
            <button 
              onClick={() => window.open('https://wa.me/5549998362864', '_blank')}
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto"
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