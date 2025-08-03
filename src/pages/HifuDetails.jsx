import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { Play, CheckCircle, Phone } from 'lucide-react';

const HifuDetails = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const hifuVideos = [
    { 
      title: 'Procedimento HIFU Completo', 
      description: 'Veja passo a passo como é realizado o procedimento HIFU',
      file: 'hifu.mp4',
      duration: '3:45'
    },
    { 
      title: 'Consulta e Avaliação', 
      description: 'Como é feita a avaliação inicial para HIFU',
      file: 'hifuatendimento.mp4',
      duration: '2:30'
    },
    { 
      title: 'Resultados Reais', 
      description: 'Transformações incríveis dos nossos pacientes',
      file: 'hifudois.mp4',
      duration: '4:12'
    }
  ];

  const hifuBenefits = [
    {
      icon: '🎯',
      title: 'Precisão Cirúrgica',
      description: 'Tecnologia que atinge camadas específicas da pele com precisão milimétrica'
    },
    {
      icon: '⚡',
      title: 'Resultados Naturais',
      description: 'Lifting natural que respeita as características únicas do seu rosto'
    },
    {
      icon: '🛡️',
      title: 'Segurança Comprovada',
      description: 'Procedimento aprovado pelo FDA e utilizado mundialmente'
    },
    {
      icon: '⏰',
      title: 'Sem Tempo de Recuperação',
      description: 'Volte às suas atividades normais imediatamente após o procedimento'
    },
    {
      icon: '📈',
      title: 'Resultados Progressivos',
      description: 'Melhora contínua por até 6 meses após o tratamento'
    },
    {
      icon: '💆‍♀️',
      title: 'Conforto no Tratamento',
      description: 'Procedimento confortável com mínimo desconforto'
    }
  ];

  const treatmentSteps = [
    {
      step: 1,
      title: 'Consulta Inicial',
      description: 'Avaliação completa da pele e definição do plano de tratamento personalizado'
    },
    {
      step: 2,
      title: 'Preparação',
      description: 'Limpeza da pele e aplicação de gel condutor para o procedimento'
    },
    {
      step: 3,
      title: 'Aplicação HIFU',
      description: 'Aplicação do ultrasom microfocado nas áreas previamente definidas'
    },
    {
      step: 4,
      title: 'Pós-Tratamento',
      description: 'Orientações e cuidados pós-procedimento para otimizar os resultados'
    },
    {
      step: 5,
      title: 'Acompanhamento',
      description: 'Monitoramento da evolução e orientações para manutenção dos resultados'
    }
  ];

  const faqs = [
    {
      question: 'O que é HIFU?',
      answer: 'HIFU (High Intensity Focused Ultrasound) é uma tecnologia de ultrasom microfocado que promove o lifting facial não invasivo, estimulando a produção natural de colágeno.'
    },
    {
      question: 'Quem pode fazer HIFU?',
      answer: 'O HIFU é indicado para pessoas a partir dos 30 anos que apresentam flacidez facial leve a moderada e desejam um rejuvenescimento natural sem cirurgia.'
    },
    {
      question: 'Quando verei os resultados?',
      answer: 'Os primeiros resultados aparecem em 30 dias, com melhora progressiva por até 6 meses. O colágeno continua sendo produzido durante este período.'
    },
    {
      question: 'O procedimento dói?',
      answer: 'O HIFU pode causar um leve desconforto durante a aplicação, mas é bem tolerado pela maioria dos pacientes. Não é necessário anestesia.'
    },
    {
      question: 'Quantas sessões são necessárias?',
      answer: 'Geralmente uma única sessão é suficiente. Dependendo do caso, pode ser recomendada uma sessão de manutenção após 12-18 meses.'
    },
    {
      question: 'Quais os cuidados pós-procedimento?',
      answer: 'Use protetor solar, hidrate bem a pele e evite exposição solar intensa nos primeiros dias. Não há restrições para atividades normais.'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: '📋' },
    { id: 'benefits', label: 'Benefícios', icon: '✨' },
    { id: 'process', label: 'Processo', icon: '🔄' },
    { id: 'videos', label: 'Vídeos', icon: '🎥' },
    { id: 'faq', label: 'FAQ', icon: '❓' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-r from-blue-900 to-green-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              HIFU - Ultrasson Microfocado
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8">
              O futuro do rejuvenescimento facial não invasivo
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-semibold mb-2">Tecnologia FDA</h3>
                <p className="text-blue-100 text-sm">Aprovada mundialmente</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-semibold mb-2">Precisão Única</h3>
                <p className="text-blue-100 text-sm">Atinge camadas específicas</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl">
                <div className="text-3xl mb-2">✨</div>
                <h3 className="font-semibold mb-2">Resultados Naturais</h3>
                <p className="text-blue-100 text-sm">Lifting progressivo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="sticky top-20 bg-white shadow-md z-30">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-6 py-4 font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-12">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                O que é HIFU?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                O HIFU (High Intensity Focused Ultrasound) é uma tecnologia revolucionária que utiliza 
                ultrasom microfocado para promover o lifting facial não invasivo. O tratamento estimula 
                a produção natural de colágeno nas camadas profundas da pele, proporcionando firmeza 
                e rejuvenescimento progressivo.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Como Funciona</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-green-600 mt-1" size={20} />
                      <span className="text-gray-600">Energia focada atinge camadas específicas da pele</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-green-600 mt-1" size={20} />
                      <span className="text-gray-600">Estimula a produção natural de colágeno</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-green-600 mt-1" size={20} />
                      <span className="text-gray-600">Promove firmeza e lifting progressivo</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Áreas Tratadas</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-blue-600 mt-1" size={20} />
                      <span className="text-gray-600">Face completa</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-blue-600 mt-1" size={20} />
                      <span className="text-gray-600">Pescoço e papada</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-blue-600 mt-1" size={20} />
                      <span className="text-gray-600">Contorno facial</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Benefits Tab */}
        {activeTab === 'benefits' && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              Benefícios do HIFU
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hifuBenefits.map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Process Tab */}
        {activeTab === 'process' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              Como é o Processo
            </h2>
            <div className="space-y-8">
              {treatmentSteps.map((step, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Videos Tab */}
        {activeTab === 'videos' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              Vídeos dos Procedimentos
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                {hifuVideos.map((video, index) => (
                  <div 
                    key={index}
                    onClick={() => setActiveVideoIndex(index)}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      activeVideoIndex === index 
                        ? 'bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200' 
                        : 'bg-white hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        activeVideoIndex === index
                          ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        <Play size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{video.title}</h4>
                        <p className="text-gray-600 text-sm">{video.description}</p>
                        <span className="text-xs text-gray-500">{video.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gray-900 rounded-xl p-8 text-center text-white">
                <Play size={64} className="mx-auto mb-4 opacity-70" />
                <h3 className="text-xl font-semibold mb-2">
                  {hifuVideos[activeVideoIndex].title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {hifuVideos[activeVideoIndex].description}
                </p>
                <p className="text-gray-400 text-sm">
                  📹 Arquivo: {hifuVideos[activeVideoIndex].file}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              Perguntas Frequentes
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Pronto para o seu tratamento HIFU?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Agende sua consulta e descubra como o HIFU pode transformar sua aparência 
            de forma natural e segura.
          </p>
          <button 
            onClick={() => window.open('https://wa.me/5549998362864?text=Olá! Gostaria de agendar uma consulta para o tratamento HIFU.', '_blank')}
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
          >
            <Phone size={20} />
            Agendar Consulta HIFU
          </button>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default HifuDetails;