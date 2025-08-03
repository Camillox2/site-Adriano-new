import React from 'react';
import { Award, Users, Clock, Star, GraduationCap, MapPin } from 'lucide-react';

const AboutSection = () => {
  const achievements = [
    {
      icon: <Award className="text-blue-600" size={40} />,
      title: "Especialista",
      description: "Ortodontia e HOF",
      details: "Formação especializada em Ortodontia e Harmonização Orofacial"
    },
    {
      icon: <GraduationCap className="text-green-600" size={40} />,
      title: "Professor",
      description: "Harmonização Orofacial",
      details: "Ministra cursos e workshops para profissionais da área"
    },
    {
      icon: <MapPin className="text-blue-600" size={40} />,
      title: "3 Cidades",
      description: "Atendimento Regional",
      details: "São Lourenço do Oeste, Realeza e Ampére"
    },
    {
      icon: <Star className="text-green-600" size={40} />,
      title: "Tecnologia HIFU",
      description: "Inovação Avançada",
      details: "Pioneiro em HIFU na região com tecnologia de ponta"
    }
  ];

  const stats = [
    { number: "500+", label: "Pacientes Atendidos", description: "Sorrisos transformados" },
    { number: "15+", label: "Anos de Experiência", description: "Dedicação à odontologia" },
    { number: "100+", label: "Procedimentos HIFU", description: "Especialista na técnica" },
    { number: "3", label: "Cidades", description: "Atendimento regional" }
  ];

  const specialties = [
    "🦷 Ortodontia Convencional e Estética",
    "😀 Implantodontia Avançada", 
    "💉 Harmonização Orofacial",
    "⚡ HIFU - Ultrasson Microfocado",
    "🧪 Ozonioterapia",
    "👨🏼‍🏫 Ensino em HOF"
  ];

  return (
    <section id="sobre" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 right-10 w-32 h-32 bg-blue-600 rounded-full"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-green-600 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
            👨‍⚕️ CONHEÇA O PROFISSIONAL
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Dr. Adriano Camillo
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cirurgião-dentista dedicado à excelência em tratamentos odontológicos e estéticos, 
            sempre em busca das mais novas tecnologias para oferecer o melhor aos pacientes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Text Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Experiência e Dedicação
              </h3>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Cirurgião-dentista especializado em <strong>Ortodontia</strong> com mais de 15 anos de experiência 
                  em tratamentos odontológicos e estéticos. Professor de <strong>Harmonização Orofacial</strong>, 
                  sempre em busca das mais novas tecnologias e técnicas para oferecer o melhor aos pacientes.
                </p>
                <p>
                  Atuo com foco na <strong>excelência técnica</strong> e no <strong>atendimento humanizado</strong>, 
                  oferecendo tratamentos personalizados para cada paciente. Acredito que cada sorriso é único 
                  e merece cuidado especializado.
                </p>
                <p>
                  Como <strong>pioneiro em HIFU</strong> na região, tenho me dedicado a trazer as mais 
                  modernas tecnologias de rejuvenescimento facial para nossos pacientes, sempre 
                  priorizando resultados naturais e seguros.
                </p>
              </div>
            </div>

            {/* Specialties */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Especialidades
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {specialties.map((specialty, index) => (
                  <div 
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <span className="text-gray-700 font-medium">{specialty}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Philosophy */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl border border-blue-100">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                💭 Filosofia de Trabalho
              </h4>
              <p className="text-gray-600 italic">
                "Acredito que um sorriso transformado tem o poder de mudar vidas. Cada tratamento 
                é uma oportunidade de devolver confiança e autoestima aos meus pacientes, utilizando 
                sempre as melhores técnicas e tecnologias disponíveis."
              </p>
            </div>
          </div>
          
          {/* Achievements Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="mb-4">
                  {achievement.icon}
                </div>
                <h4 className="font-bold text-gray-800 mb-2 text-lg">
                  {achievement.title}
                </h4>
                <p className="text-gray-600 font-medium mb-2">
                  {achievement.description}
                </p>
                <p className="text-gray-500 text-sm">
                  {achievement.details}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Números que Representam Nosso Compromisso
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-800 font-semibold mb-1">
                  {stat.label}
                </div>
                <div className="text-gray-500 text-sm">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              🎯 Nossa Missão
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Proporcionar tratamentos odontológicos e estéticos de excelência, utilizando 
              tecnologia de ponta e atendimento humanizado, transformando sorrisos e 
              elevando a autoestima de nossos pacientes.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              👁️ Nossa Visão
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Ser referência em tratamentos odontológicos e estéticos na região, 
              reconhecidos pela inovação, qualidade técnica e compromisso com 
              a satisfação e bem-estar de nossos pacientes.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">
              Pronto para transformar seu sorriso?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Agende sua consulta e descubra como podemos ajudar você a alcançar 
              o sorriso dos seus sonhos com segurança e tecnologia de ponta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.open('https://wa.me/5549998362864', '_blank')}
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                📱 Agendar Consulta
              </button>
              <button 
                onClick={() => window.open('https://www.instagram.com/dr.adrianocamillo/', '_blank')}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                📸 Ver Instagram
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;