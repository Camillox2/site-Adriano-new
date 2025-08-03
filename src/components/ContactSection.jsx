import React from 'react';
import { MapPin, Phone, Clock, Instagram, Mail, Sparkles, ArrowRight } from 'lucide-react';

const ContactSection = () => {
  const workLocations = [
    { 
      city: 'São Lourenço do Oeste', 
      clinicName: 'Clínica Dr. Adriano Camillo',
      address: 'Rua Principal, 123 - Centro',
      phone: '(49) 9 9836-2864',
      schedule: 'Seg à Sex: 8h às 18h\nSáb: 8h às 12h',
      highlight: true,
      services: ['Ortodontia', 'HIFU', 'Harmonização', 'Implantes'],
      icon: '🏥'
    },
    { 
      city: 'Realeza', 
      clinicName: 'Consultório Odontológico',
      address: 'Av. Brasil, 456 - Centro',
      phone: '(49) 9 9836-2864',
      schedule: 'Ter e Qui: 8h às 17h\nSáb: 8h às 12h',
      highlight: false,
      services: ['Ortodontia', 'Harmonização', 'Consultas'],
      icon: '🦷'
    },
    { 
      city: 'Ampére', 
      clinicName: 'Centro Odontológico',
      address: 'Rua das Flores, 789 - Centro',
      phone: '(49) 9 9836-2864',
      schedule: 'Qua e Sex: 8h às 17h',
      highlight: false,
      services: ['Ortodontia', 'Avaliações', 'Tratamentos'],
      icon: '✨'
    }
  ];

  const contactMethods = [
    {
      icon: <Phone className="text-emerald-600" size={28} />,
      title: 'WhatsApp',
      description: 'Resposta rápida e personalizada',
      value: '(49) 9 9836-2864',
      action: () => window.open('https://wa.me/5549998362864', '_blank'),
      buttonText: 'Enviar Mensagem',
      primary: true,
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      icon: <Instagram className="text-purple-600" size={28} />,
      title: 'Instagram',
      description: 'Veja nossos trabalhos e resultados',
      value: '@dr.adrianocamillo',
      action: () => window.open('https://www.instagram.com/dr.adrianocamillo/', '_blank'),
      buttonText: 'Seguir no Instagram',
      primary: false,
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: <Mail className="text-blue-600" size={28} />,
      title: 'E-mail',
      description: 'Envie suas dúvidas detalhadas',
      value: 'contato@dradrianocamillo.com',
      action: () => window.location.href = 'mailto:contato@dradrianocamillo.com',
      buttonText: 'Enviar E-mail',
      primary: false,
      gradient: 'from-blue-500 to-indigo-600'
    }
  ];

  return (
    <section id="contato" className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Enhanced Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 -left-20 w-64 h-64 bg-gradient-to-br from-emerald-100 to-purple-100 rounded-full opacity-30 animate-bounce slow"></div>
        <div className="absolute bottom-20 right-1/3 w-48 h-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-30 animate-ping slow"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full opacity-20 animate-spin-slow"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 font-bold mb-4 inline-block text-lg">
            📞 ENTRE EM CONTATO
          </span>
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="text-blue-500 animate-pulse" size={32} />
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-800">
              Fale 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                {" "}Conosco
              </span>
            </h2>
            <Sparkles className="text-emerald-500 animate-pulse" size={32} />
          </div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Atendemos em 3 cidades da região com excelência e dedicação. 
            Escolha a forma de contato que preferir e transforme seu sorriso conosco!
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <div 
              key={index}
              className="group bg-white p-8 rounded-2xl text-center hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${method.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-white group-hover:to-gray-50 transition-all duration-300 group-hover:scale-110">
                    {method.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-gray-900">{method.title}</h3>
                <p className="text-gray-600 mb-4 text-lg">{method.description}</p>
                <p className="text-gray-800 font-bold mb-6 text-lg">{method.value}</p>
                <button 
                  onClick={method.action}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                    method.primary 
                      ? `bg-gradient-to-r ${method.gradient} text-white hover:shadow-xl hover:scale-105 transform` 
                      : `bg-gradient-to-r ${method.gradient} text-white hover:shadow-xl hover:scale-105 transform`
                  } flex items-center justify-center gap-2 group/button`}
                >
                  <span>{method.buttonText}</span>
                  <ArrowRight size={20} className="group-hover/button:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Work Locations */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">
              Locais de 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-600">
                {" "}Trabalho
              </span>
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Atendimento especializado em 3 cidades da região com toda estrutura 
              e tecnologia para cuidar do seu sorriso
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workLocations.map((location, index) => (
              <div 
                key={index} 
                className={`group p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:scale-105 relative overflow-hidden card-professional ${
                  location.highlight 
                    ? 'bg-gradient-to-br from-slate-50 to-gray-50 border-2 border-slate-300' 
                    : 'bg-white border border-gray-200'
                }`}
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 to-gray-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  {location.highlight && (
                    <div className="bg-gradient-to-r from-slate-700 to-slate-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 inline-flex items-center gap-2">
                      <Sparkles size={16} />
                      ⭐ Clínica Principal
                    </div>
                  )}
                  
                  <div className="flex justify-center mb-6">
                    <div className="text-4xl p-4 rounded-full bg-gradient-to-br from-slate-100 to-gray-100 group-hover:scale-110 group-hover:animate-bounce-soft transition-all duration-500">
                      {location.icon}
                    </div>
                  </div>
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-slate-700 transition-colors">
                      {location.city}
                    </h3>
                    <h4 className="text-lg font-semibold text-slate-600 mb-4">
                      {location.clinicName}
                    </h4>
                  </div>

                  {/* Services Tags */}
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {location.services.map((service, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium group-hover:bg-slate-200 transition-colors">
                        {service}
                      </span>
                    ))}
                  </div>
                  
                  <div className="space-y-4 text-center">
                    <div className="flex items-start justify-center gap-3 p-3 rounded-lg bg-gray-50 group-hover:bg-white transition-colors">
                      <MapPin className="text-slate-600 flex-shrink-0 mt-1" size={18} />
                      <p className="text-gray-700 font-medium">{location.address}</p>
                    </div>
                    <div className="flex items-center justify-center gap-3 p-3 rounded-lg bg-gray-50 group-hover:bg-white transition-colors">
                      <Phone className="text-slate-600" size={18} />
                      <p className="text-gray-700 font-bold">{location.phone}</p>
                    </div>
                    <div className="flex items-start justify-center gap-3 p-3 rounded-lg bg-gray-50 group-hover:bg-white transition-colors">
                      <Clock className="text-slate-600 flex-shrink-0 mt-1" size={18} />
                      <p className="text-gray-600 whitespace-pre-line">{location.schedule}</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => window.open('https://wa.me/5549998362864', '_blank')}
                    className="w-full mt-8 bg-gradient-to-r from-slate-700 to-slate-800 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-500 flex items-center justify-center gap-2 group/button professional-hover"
                  >
                    <span className="group-hover/button:animate-pulse">Agendar nesta Unidade</span>
                    <ArrowRight size={20} className="group-hover/button:translate-x-2 group-hover/button:scale-110 transition-all duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Main CTA */}
        <div className="text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-800 rounded-3xl transform rotate-1 opacity-20"></div>
          <div className="relative bg-gradient-to-r from-slate-700 to-slate-800 p-12 lg:p-16 rounded-3xl text-white shadow-2xl overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-20">
                <div className="absolute top-10 left-10 w-24 h-24 bg-white/20 rounded-full animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-20 h-20 bg-white/20 rounded-full animate-bounce delay-1000"></div>
                <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/20 rounded-full animate-ping delay-500"></div>
                <div className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-white/20 rounded-full animate-pulse delay-700"></div>
              </div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-4 mb-8">
                <Sparkles className="text-yellow-300 animate-pulse" size={40} />
                <h3 className="text-4xl lg:text-5xl font-bold text-center">
                  Pronto para começar sua transformação?
                </h3>
                <Sparkles className="text-yellow-300 animate-pulse" size={40} />
              </div>
              <p className="text-slate-200 mb-10 text-xl max-w-4xl mx-auto leading-relaxed">
                Entre em contato conosco agora mesmo e agende sua consulta personalizada. 
                Nossa equipe está pronta para atendê-lo com excelência, cuidado e as mais modernas tecnologias!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
                <button 
                  onClick={() => window.open('https://wa.me/5549998362864', '_blank')}
                  className="bg-white text-slate-700 px-12 py-6 rounded-full font-bold hover:shadow-2xl transition-all duration-500 text-xl flex items-center gap-3 hover:scale-110 hover:-translate-y-2 transform group professional-hover"
                >
                  <Phone size={28} className="group-hover:animate-bounce group-hover:scale-125 transition-all duration-300" />
                  <span className="group-hover:animate-pulse">(49) 9 9836-2864</span>
                </button>
                
                <div className="text-slate-200 hidden sm:flex items-center gap-2 text-lg">
                  <div className="w-8 h-px bg-slate-300"></div>
                  <span>ou</span>
                  <div className="w-8 h-px bg-slate-300"></div>
                </div>
                
                <button 
                  onClick={() => window.open('https://www.instagram.com/dr.adrianocamillo/', '_blank')}
                  className="border-2 border-white text-white px-10 py-5 rounded-full font-bold hover:bg-white hover:text-slate-700 transition-all duration-500 flex items-center gap-3 hover:scale-110 hover:-translate-y-2 transform group professional-hover"
                >
                  <Instagram size={28} className="group-hover:animate-pulse" />
                  <span>Instagram</span>
                </button>
              </div>

              {/* Enhanced Additional Info */}
              <div className="mt-10 pt-8 border-t border-slate-400 border-opacity-30">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-200">
                  <div className="flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300">
                    <MapPin size={20} className="animate-bounce-soft" />
                    <span>3 Cidades Atendidas</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300">
                    <Clock size={20} className="animate-pulse-soft" />
                    <span>Horários Flexíveis</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300">
                    <Phone size={20} className="animate-float" />
                    <span>Resposta Rápida</span>
                  </div>
                </div>
                <p className="text-slate-300 text-lg mt-4 font-medium">
                  São Lourenço do Oeste • Realeza • Ampére
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Emergency Contact */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 p-8 rounded-2xl max-w-3xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 bg-red-100 rounded-full animate-pulse">
                  <Phone className="text-red-600" size={24} />
                </div>
                <h4 className="text-2xl font-bold text-red-800">
                  Urgência Odontológica?
                </h4>
              </div>
              <p className="text-red-700 mb-6 text-lg leading-relaxed">
                Para emergências odontológicas, entre em contato diretamente via WhatsApp 
                para atendimento prioritário e imediato.
              </p>
              <button 
                onClick={() => window.open('https://wa.me/5549998362864?text=Olá! Tenho uma emergência odontológica.', '_blank')}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto group"
              >
                <span>Contato de Emergência</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;