import React from 'react';
import { Phone, Instagram, MapPin, Clock, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    '🦷 Ortodontia',
    '😀 Implantes Dentais',
    '💉 Harmonização Orofacial',
    '⚡ HIFU - Ultrasson Microfocado',
    '🧪 Ozonioterapia',
    '👨🏼‍🏫 Cursos de HOF'
  ];

  const locations = [
    'São Lourenço do Oeste',
    'Realeza',
    'Ampére'
  ];

  const quickLinks = [
    { text: 'Início', href: '#inicio' },
    { text: 'Serviços', href: '#servicos' },
    { text: 'HIFU', href: '#hifu' },
    { text: 'Sobre', href: '#sobre' },
    { text: 'Contato', href: '#contato' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-10 right-20 w-20 h-20 bg-blue-600 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-16 h-16 bg-green-600 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  DA
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Dr. Adriano Camillo</h3>
                  <p className="text-gray-400">Cirurgião Dentista</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Transformando sorrisos e autoestima com tecnologia de ponta, 
                cuidado especializado e atendimento humanizado.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-4">
                <button 
                  onClick={() => window.open('https://wa.me/5549998362864', '_blank')}
                  className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                  title="WhatsApp"
                >
                  <Phone size={20} />
                </button>
                <button 
                  onClick={() => window.open('https://www.instagram.com/dr.adrianocamillo/', '_blank')}
                  className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
                  title="Instagram"
                >
                  <Instagram size={20} />
                </button>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-white">Links Rápidos</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-400 hover:text-blue-400 transition-colors block"
                    >
                      {link.text}
                    </button>
                  </li>
                ))}
                <li>
                  <button 
                    onClick={() => window.open('https://www.instagram.com/dr.adrianocamillo/', '_blank')}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    Resultados
                  </button>
                </li>
              </ul>
            </div>
            
            {/* Services */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-white">Nossos Serviços</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="text-gray-400 text-sm">
                    {service}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-white">Contato</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="text-green-500 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-white font-semibold">(49) 9 9836-2864</p>
                    <p className="text-gray-400 text-sm">WhatsApp</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="text-white font-semibold mb-2">Atendemos em:</p>
                    {locations.map((location, index) => (
                      <p key={index} className="text-gray-400 text-sm">
                        📍 {location}
                      </p>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="text-white font-semibold">Horários:</p>
                    <p className="text-gray-400 text-sm">
                      Segunda à Sexta: 8h às 18h<br/>
                      Sábados: 8h às 12h
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Instagram className="text-pink-500" size={20} />
                  <div>
                    <button 
                      onClick={() => window.open('https://www.instagram.com/dr.adrianocamillo/', '_blank')}
                      className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                    >
                      @dr.adrianocamillo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-8 border-t border-gray-800">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Pronto para transformar seu sorriso?
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Agende sua consulta agora mesmo e descubra como podemos ajudar 
              você a alcançar o sorriso dos seus sonhos.
            </p>
            <button 
              onClick={() => window.open('https://wa.me/5549998362864', '_blank')}
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3"
            >
              <Phone size={20} />
              Agendar Consulta Agora
            </button>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>
                &copy; {currentYear} Dr. Adriano Camillo. Todos os direitos reservados.
              </p>
              <p className="mt-1">
                CRO-SC 12345 | Desenvolvido com{' '}
                <Heart className="inline text-red-500" size={16} />{' '}
                para nossos pacientes
              </p>
            </div>
            
            <div className="flex gap-6 text-sm">
              <button className="text-gray-400 hover:text-white transition-colors">
                Política de Privacidade
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                Termos de Uso
              </button>
            </div>
          </div>
        </div>

        {/* Specialty Badges */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-blue-900 text-blue-300 px-4 py-2 rounded-full text-xs font-medium">
              🦷 Especialista em Ortodontia
            </span>
            <span className="bg-green-900 text-green-300 px-4 py-2 rounded-full text-xs font-medium">
              💉 Professor de HOF
            </span>
            <span className="bg-purple-900 text-purple-300 px-4 py-2 rounded-full text-xs font-medium">
              ⚡ Especialista em HIFU
            </span>
            <span className="bg-orange-900 text-orange-300 px-4 py-2 rounded-full text-xs font-medium">
              🧪 Ozonioterapia
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;