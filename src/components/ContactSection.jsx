import React from 'react';
import { MapPin, Phone, Clock, Instagram, Mail } from 'lucide-react';

const ContactSection = () => {
  const locations = [
    { 
      city: 'São Lourenço do Oeste', 
      address: 'Rua Principal, 123 - Centro',
      phone: '(49) 9 9836-2864',
      schedule: 'Seg à Sex: 8h às 18h\nSáb: 8h às 12h',
      highlight: true
    },
    { 
      city: 'Realeza', 
      address: 'Av. Brasil, 456 - Centro',
      phone: '(49) 9 9836-2864',
      schedule: 'Ter e Qui: 8h às 17h\nSáb: 8h às 12h',
      highlight: false
    },
    { 
      city: 'Ampére', 
      address: 'Rua das Flores, 789 - Centro',
      phone: '(49) 9 9836-2864',
      schedule: 'Qua e Sex: 8h às 17h',
      highlight: false
    }
  ];

  const contactMethods = [
    {
      icon: <Phone className="text-green-600" size={24} />,
      title: 'WhatsApp',
      description: 'Resposta rápida',
      value: '(49) 9 9836-2864',
      action: () => window.open('https://wa.me/5549998362864', '_blank'),
      buttonText: 'Enviar Mensagem',
      primary: true
    },
    {
      icon: <Instagram className="text-pink-600" size={24} />,
      title: 'Instagram',
      description: 'Veja nossos trabalhos',
      value: '@dr.adrianocamillo',
      action: () => window.open('https://www.instagram.com/dr.adrianocamillo/', '_blank'),
      buttonText: 'Seguir',
      primary: false
    },
    {
      icon: <Mail className="text-blue-600" size={24} />,
      title: 'E-mail',
      description: 'Envie sua dúvida',
      value: 'contato@dradrianocamillo.com',
      action: () => window.location.href = 'mailto:contato@dradrianocamillo.com',
      buttonText: 'Enviar E-mail',
      primary: false
    }
  ];

  return (
    <section id="contato" className="py-20 bg-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 right-10 w-32 h-32 bg-blue-600 rounded-full"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-green-600 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
            📞 ENTRE EM CONTATO
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Fale Conosco
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Atendemos em 3 cidades da região. Escolha a unidade mais próxima 
            e agende sua consulta para transformar seu sorriso.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <div 
              key={index}
              className={`bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-all duration-300 border-2 ${
                method.primary ? 'border-green-200 bg-green-50' : 'border-gray-100'
              }`}
            >
              <div className="flex justify-center mb-4">
                {method.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{method.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{method.description}</p>
              <p className="text-gray-800 font-semibold mb-4">{method.value}</p>
              <button 
                onClick={method.action}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                  method.primary 
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                }`}
              >
                {method.buttonText}
              </button>
            </div>
          ))}
        </div>
        
        {/* Locations */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Nossas Unidades
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <div 
                key={index} 
                className={`p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  location.highlight 
                    ? 'bg-gradient-to-br from-blue-50 to-green-50 border-2 border-blue-200' 
                    : 'bg-white border border-gray-100'
                }`}
              >
                {location.highlight && (
                  <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                    ⭐ Unidade Principal
                  </div>
                )}
                <div className="flex justify-center mb-4">
                  <MapPin className="text-blue-600" size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                  {location.city}
                </h3>
                <div className="space-y-3 text-center">
                  <div className="flex items-start justify-center gap-2">
                    <MapPin className="text-gray-500 flex-shrink-0 mt-1" size={16} />
                    <p className="text-gray-600">{location.address}</p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="text-green-600" size={16} />
                    <p className="text-gray-700 font-medium">{location.phone}</p>
                  </div>
                  <div className="flex items-start justify-center gap-2">
                    <Clock className="text-blue-600 flex-shrink-0 mt-1" size={16} />
                    <p className="text-gray-600 text-sm whitespace-pre-line">{location.schedule}</p>
                  </div>
                </div>
                <button 
                  onClick={() => window.open('https://wa.me/5549998362864', '_blank')}
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Agendar nesta Unidade
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Main CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 p-8 lg:p-12 rounded-2xl text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">
              Pronto para começar sua transformação?
            </h3>
            <p className="text-blue-100 mb-8 text-lg max-w-3xl mx-auto">
              Entre em contato conosco agora mesmo e agende sua consulta. 
              Nossa equipe está pronta para atendê-lo com excelência e cuidado.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => window.open('https://wa.me/5549998362864', '_blank')}
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all duration-300 text-lg flex items-center gap-3 hover:scale-105"
              >
                <Phone size={24} />
                (49) 9 9836-2864
              </button>
              
              <div className="text-blue-100 hidden sm:block">ou</div>
              
              <button 
                onClick={() => window.open('https://www.instagram.com/dr.adrianocamillo/', '_blank')}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center gap-3"
              >
                <Instagram size={24} />
                Instagram
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-8 border-t border-blue-400 border-opacity-30">
              <p className="text-blue-100 text-sm">
                📍 Atendemos em: São Lourenço do Oeste • Realeza • Ampére<br/>
                🕒 Horários flexíveis • 📱 Resposta rápida no WhatsApp
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-12 text-center">
          <div className="bg-red-50 border border-red-200 p-6 rounded-xl max-w-2xl mx-auto">
            <h4 className="text-lg font-semibold text-red-800 mb-2">
              🚨 Urgência Odontológica?
            </h4>
            <p className="text-red-700 mb-4">
              Para emergências odontológicas, entre em contato diretamente via WhatsApp 
              para atendimento prioritário.
            </p>
            <button 
              onClick={() => window.open('https://wa.me/5549998362864?text=Olá! Tenho uma emergência odontológica.', '_blank')}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Contato de Emergência
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;