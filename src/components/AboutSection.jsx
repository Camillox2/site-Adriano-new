import React, { useState } from 'react';
import { Award, Star, GraduationCap, MapPin, X, ExternalLink } from 'lucide-react';
import { images } from '../assets';

const AboutSection = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  const achievements = [
    {
      icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
      title: "Especialização em Ortodontia",
      description: "Formação avançada em correção dental"
    },
    {
      icon: <Award className="w-8 h-8 text-emerald-600" />,
      title: "Certificado HIFU",
      description: "Tecnologia de ultrassom microfocado"
    },
    {
      icon: <Star className="w-8 h-8 text-blue-600" />,
      title: "15+ Anos de Experiência",
      description: "Atendimento especializado e humanizado"
    }
  ];

  const locations = [
    {
      city: "São Lourenço do Oeste - SC",
      address: "Rua Coronel Bertaso, 1243 - Sala 206 - Centro",
      cep: "89990-000",
      type: "Consultório Principal",
      mapsUrl: "https://maps.google.com/?q=Rua+Coronel+Bertaso,+1243+-+Sala+206+-+Centro,+São+Lourenço+do+Oeste+-+SC,+89990-000"
    },
    {
      city: "Realeza - PR",
      address: "Consulte horários disponíveis",
      cep: "",
      type: "Atendimento Agendado",
      mapsUrl: "https://maps.google.com/?q=Realeza,+PR"
    },
    {
      city: "Ampére - PR", 
      address: "Consulte horários disponíveis",
      cep: "",
      type: "Atendimento Agendado",
      mapsUrl: "https://maps.google.com/?q=Ampére,+PR"
    },
    {
      city: "Curitiba - PR",
      address: "Sem local fixo - Atendimento domiciliar",
      cep: "",
      type: "Atendimento Domiciliar",
      mapsUrl: "https://maps.google.com/?q=Curitiba,+PR"
    }
  ];

  // Modal para locais de atendimento
  const LocationModal = ({ location, onClose }) => (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold mb-2">{location.city}</h3>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{location.type}</span>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:text-red-200 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <MapPin size={18} className="text-blue-600" />
                Endereço
              </h4>
              <p className="text-gray-600">{location.address}</p>
              {location.cep && <p className="text-gray-500 text-sm">{location.cep}</p>}
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800 text-sm mb-3">
                📍 Clique no botão abaixo para abrir no Google Maps e ver a rota
              </p>
              <button
                onClick={() => window.open(location.mapsUrl, '_blank')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ExternalLink size={18} />
                Ver no Google Maps
              </button>
            </div>
            
            <div className="bg-emerald-50 p-4 rounded-lg">
              <p className="text-emerald-800 text-sm mb-3">
                📱 Para agendar sua consulta neste local:
              </p>
              <button
                onClick={() => window.open('https://wa.me/5549998362864?text=Olá! Gostaria de agendar uma consulta em ' + location.city, '_blank')}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                💬 Agendar via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="sobre" className="py-20 bg-gradient-to-br from-blue-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Background Animations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Orbs */}
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-gradient-to-br from-blue-100/40 to-emerald-100/40 rounded-full animate-gentle-wave opacity-30"></div>
        <div className="absolute top-1/3 -left-20 w-64 h-64 bg-gradient-to-br from-emerald-100/40 to-blue-100/40 rounded-full animate-subtle-pulse opacity-30"></div>
        <div className="absolute bottom-20 right-1/3 w-56 h-56 bg-gradient-to-br from-blue-200/30 to-emerald-200/30 rounded-full animate-gentle-wave opacity-30" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-20 left-1/4 w-40 h-40 bg-gradient-to-br from-emerald-200/30 to-blue-200/30 rounded-full animate-smooth-rotate opacity-30"></div>
        
        {/* Gradient Background */}
        <div className="absolute inset-0 animate-gradient-flow opacity-[0.03]"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-10 left-10 w-3 h-3 bg-blue-400 rounded-full animate-particle-float opacity-60"></div>
        <div className="absolute top-1/2 right-20 w-2 h-2 bg-emerald-400 rounded-full animate-particle-float opacity-60" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-4 h-4 bg-blue-300 rounded-full animate-particle-float opacity-60" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-emerald-300 rounded-full animate-particle-float opacity-60" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-1/3 left-1/5 w-3 h-3 bg-blue-200 rounded-full animate-particle-float opacity-60" style={{animationDelay: '4s'}}></div>
        
        {/* Partículas extras para mais dinamismo */}
        <div className="absolute top-32 right-12 w-2 h-2 bg-blue-300/50 rounded-full animate-particle-float" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-40 right-1/5 w-3 h-3 bg-emerald-300/50 rounded-full animate-particle-float" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-64 left-16 w-2 h-2 bg-blue-400/50 rounded-full animate-particle-float" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute bottom-32 right-40 w-4 h-4 bg-emerald-200/50 rounded-full animate-particle-float" style={{animationDelay: '3.5s'}}></div>
        <div className="absolute top-48 right-1/3 w-2 h-2 bg-blue-500/50 rounded-full animate-particle-float" style={{animationDelay: '4.5s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 font-bold mb-4 inline-block text-lg">
            👨‍⚕️ CONHEÇA O PROFISSIONAL
          </span>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full animate-pulse-soft"></div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900">
              Dr. 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                Adriano Camillo
              </span>
            </h2>
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full animate-pulse-soft delay-500"></div>
          </div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Cirurgião-dentista especializado em <strong>Ortodontia</strong>, <strong>Implantes</strong>, 
            <strong> Harmonização Orofacial</strong> e <strong>HIFU</strong>. 
            Comprometido em oferecer o melhor atendimento com tecnologia de ponta.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center mb-16">
          {/* Photo Section */}
          <div className="lg:col-span-1 text-center">
            <div className="relative group">
              {/* Efeito de brilho ao redor da foto */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-subtle-pulse"></div>
              
              <div className="w-80 h-80 mx-auto rounded-full overflow-hidden shadow-2xl ring-8 ring-white/50 hover:ring-blue-200/50 transition-all duration-500 relative z-10">
                <img 
                  src={images.pai} 
                  alt="Dr. Adriano Camillo" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white p-3 rounded-full animate-bounce-soft z-20">
                ⚕️
              </div>
            </div>
            <div className="mt-6 bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="font-bold text-gray-800 mb-2">Cirurgião-Dentista</h3>
              <p className="text-gray-600 text-sm">CRO-SC 12345</p>
              <div className="mt-2 text-center">
                <span className="inline-block bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  ✓ Verificado
                </span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-emerald-600 rounded-full"></div>
                Formação e Experiência
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Com mais de 15 anos de experiência, Dr. Adriano Camillo é referência em tratamentos 
                odontológicos avançados. Graduado pela Universidade Federal de Santa Catarina (UFSC), 
                possui especialização em Ortodontia e certificações em Harmonização Orofacial e HIFU.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Sua abordagem combina técnicas tradicionais comprovadas com as mais modernas 
                tecnologias disponíveis, sempre priorizando o conforto e a satisfação do paciente.
              </p>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 group relative overflow-hidden"
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className="flex flex-col items-center text-center relative z-10">
                    <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-full group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      {achievement.icon}
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{achievement.title}</h4>
                    <p className="text-gray-600 text-sm">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Locations */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <MapPin className="text-blue-600" size={28} />
              Locais de Atendimento
            </h3>
            <p className="text-gray-600">Atendimento especializado em 3 cidades da região</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.map((location, index) => (
              <div 
                key={index}
                onClick={() => setSelectedLocation(location)}
                className="text-center p-6 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl hover:shadow-lg transition-all duration-300 group cursor-pointer border border-transparent hover:border-blue-200"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="text-white" size={24} />
                </div>
                <h4 className="font-bold text-gray-800 mb-2">{location.city}</h4>
                <p className="text-gray-600 text-sm mb-2">{location.type}</p>
                <p className="text-blue-600 text-xs hover:underline">Clique para ver detalhes</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button 
              onClick={() => window.open('https://www.instagram.com/dr.adrianocamillo', '_blank')}
              className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 group"
            >
              📸 Ver Instagram
            </button>
          </div>
        </div>
      </div>
      
      {/* Modal de localização */}
      {selectedLocation && (
        <LocationModal 
          location={selectedLocation} 
          onClose={() => setSelectedLocation(null)} 
        />
      )}
    </section>
  );
};

export default AboutSection;
