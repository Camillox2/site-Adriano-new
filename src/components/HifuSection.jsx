import React, { useState } from 'react';
import { Play, CheckCircle, ArrowRight } from 'lucide-react';

const HifuSection = () => {
  const [activeVideo, setActiveVideo] = useState(0);

  const hifuVideos = [
    { 
      title: 'Procedimento HIFU Completo', 
      description: 'Veja como é realizado o procedimento',
      file: 'hifu.mp4',
      duration: '3:45'
    },
    { 
      title: 'Atendimento Personalizado', 
      description: 'Consulta e avaliação detalhada',
      file: 'hifuatendimento.mp4',
      duration: '2:30'
    },
    { 
      title: 'Resultados HIFU', 
      description: 'Transformações incríveis dos pacientes',
      file: 'hifudois.mp4',
      duration: '4:12'
    }
  ];

  const hifuBenefits = [
    'Lifting facial não invasivo',
    'Estimula produção natural de colágeno',
    'Sem tempo de recuperação',
    'Resultados progressivos e duradouros',
    'Tecnologia FDA aprovada',
    'Procedimento seguro e eficaz'
  ];

  const hifuStats = [
    { number: '95%', label: 'Satisfação dos Pacientes' },
    { number: '30', label: 'Dias para Primeiros Resultados' },
    { number: '6', label: 'Meses de Melhora Contínua' }
  ];

  return (
    <section id="hifu" className="py-20 bg-gradient-to-r from-blue-50 to-green-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-600 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-green-600 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
            ⚡ TECNOLOGIA REVOLUCIONÁRIA
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            HIFU - Ultrasson Microfocado
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Tecnologia revolucionária para lifting facial não invasivo. 
            O futuro do rejuvenescimento está aqui com resultados comprovados!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Videos Section */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Play className="text-blue-600" size={28} />
                Vídeos dos Procedimentos
              </h3>
              
              <div className="space-y-4">
                {hifuVideos.map((video, index) => (
                  <div 
                    key={index} 
                    onClick={() => setActiveVideo(index)}
                    className={`flex items-center gap-4 p-4 rounded-lg transition-all cursor-pointer ${
                      activeVideo === index 
                        ? 'bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      activeVideo === index
                        ? 'bg-gradient-to-r from-blue-500 to-green-500'
                        : 'bg-gray-400'
                    }`}>
                      <Play className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{video.title}</h4>
                      <p className="text-gray-600 text-sm">{video.description}</p>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                      {video.duration}
                    </span>
                  </div>
                ))}
              </div>

              {/* Video Preview Area */}
              <div className="mt-6 bg-gray-900 rounded-lg p-8 text-center">
                <div className="text-white mb-4">
                  <Play size={48} className="mx-auto mb-2 opacity-70" />
                  <h4 className="font-semibold">{hifuVideos[activeVideo].title}</h4>
                  <p className="text-gray-300 text-sm">{hifuVideos[activeVideo].description}</p>
                </div>
                <p className="text-gray-400 text-sm">
                  📹 Arquivo: {hifuVideos[activeVideo].file}
                </p>
              </div>
            </div>
          </div>

          {/* Information Cards */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h4 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                ⚡ O que é o HIFU?
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Tecnologia de Ultrasson Microfocado que promove lifting facial não invasivo, 
                estimulando a produção natural de colágeno nas camadas profundas da pele.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h4 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                🎯 Áreas Tratadas
              </h4>
              <div className="grid grid-cols-2 gap-2 text-gray-600">
                <div className="flex items-center gap-1">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>Rosto completo</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>Pescoço</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>Papada</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>Contorno facial</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h4 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                ✨ Benefícios
              </h4>
              <ul className="space-y-2">
                {hifuBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {hifuStats.map((stat, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Pronto para transformar sua aparência?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Agende sua consulta e descubra como o HIFU pode rejuvenescer seu rosto 
            de forma natural e sem cirurgia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.open('https://wa.me/5549998362864', '_blank')}
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              Agendar Consulta HIFU
              <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => window.open('https://www.instagram.com/dr.adrianocamillo/', '_blank')}
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
            >
              Ver Resultados no Instagram
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HifuSection;