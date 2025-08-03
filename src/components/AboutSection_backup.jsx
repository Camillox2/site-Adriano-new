import React from 'react';
import { Award, Star, GraduationCap, MapPin } from 'lucide-react';

const AboutSection = () => {
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
    "São Lourenço do Oeste - SC",
    "Realeza - PR", 
    "Ampére - PR"
  ];

  return (
    <section id="sobre" className="py-20 bg-gradient-to-br from-blue-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Background Animations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Orbs */}
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-gradient-to-br from-blue-100/40 to-emerald-100/40 rounded-full animate-orbital opacity-30"></div>
        <div className="absolute top-1/3 -left-20 w-64 h-64 bg-gradient-to-br from-emerald-100/40 to-blue-100/40 rounded-full animate-wave opacity-30"></div>
        <div className="absolute bottom-20 right-1/3 w-56 h-56 bg-gradient-to-br from-blue-200/30 to-emerald-200/30 rounded-full animate-light-pulse opacity-30"></div>
        <div className="absolute top-20 left-1/4 w-40 h-40 bg-gradient-to-br from-emerald-200/30 to-blue-200/30 rounded-full animate-constellation opacity-30"></div>
        
        {/* Gradient Background */}
        <div className="absolute inset-0 animate-gradient-bg opacity-[0.02]"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-10 left-10 w-3 h-3 bg-blue-400 rounded-full animate-particle opacity-60"></div>
        <div className="absolute top-1/2 right-20 w-2 h-2 bg-emerald-400 rounded-full animate-float opacity-60 delay-500"></div>
        <div className="absolute bottom-20 left-1/3 w-4 h-4 bg-blue-300 rounded-full animate-bounce-soft opacity-60 delay-1000"></div>
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
            <div className="relative">
              <div className="w-80 h-80 mx-auto rounded-full overflow-hidden shadow-2xl ring-8 ring-white/50 hover:ring-blue-200/50 transition-all duration-500 card-professional">
                <img 
                  src="/src/assets/images/pai.jpg" 
                  alt="Dr. Adriano Camillo" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white p-3 rounded-full animate-bounce-soft">
                ⚕️
              </div>
            </div>
            <div className="mt-6 bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 card-professional">
              <h3 className="font-bold text-gray-800 mb-2">Cirurgião-Dentista</h3>
              <p className="text-gray-600 text-sm">CRO-SC 12345</p>
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
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 card-professional group"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-full group-hover:scale-110 transition-transform duration-300">
                      {achievement.icon}
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">{achievement.title}</h4>
                    <p className="text-gray-600 text-sm">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Locations */}
        <div className="bg-white p-8 rounded-2xl shadow-xl card-professional">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <MapPin className="text-blue-600" size={28} />
              Locais de Atendimento
            </h3>
            <p className="text-gray-600">Atendimento especializado em 3 cidades da região</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {locations.map((location, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="text-white" size={24} />
                </div>
                <h4 className="font-bold text-gray-800 mb-2">{location}</h4>
                <p className="text-gray-600 text-sm">Agende sua consulta</p>
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
    </section>
  );
};

export default AboutSection;
