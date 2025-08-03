import React from 'react';
import { Phone, Instagram } from 'lucide-react';

const Hero = () => {
  return (
    <section id="inicio" className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-green-700 flex items-center relative overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-32 right-20 w-16 h-16 bg-green-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-white rounded-full opacity-10 animate-bounce"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-white space-y-6 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Transformando
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-green-300">
                {" "}Sorrisos
              </span> e Autoestima
            </h1>
            
            <p className="text-lg sm:text-xl text-blue-100 leading-relaxed max-w-2xl">
              Dr. Adriano Camillo - Especialista em Ortodontia, Implantes, Harmonização Orofacial e HIFU. 
              Professor de HOF com atendimento em São Lourenço do Oeste, Realeza e Ampére.
            </p>
            
            {/* Specialties Pills */}
            <div className="flex flex-wrap gap-3">
              <span className="bg-blue-500 bg-opacity-30 text-white px-4 py-2 rounded-full text-sm font-medium">
                🦷 Ortodontia
              </span>
              <span className="bg-green-500 bg-opacity-30 text-white px-4 py-2 rounded-full text-sm font-medium">
                😀 Implantes
              </span>
              <span className="bg-blue-500 bg-opacity-30 text-white px-4 py-2 rounded-full text-sm font-medium">
                💉 Harmonização
              </span>
              <span className="bg-green-500 bg-opacity-30 text-white px-4 py-2 rounded-full text-sm font-medium">
                ⚡ HIFU
              </span>
            </div>
            
            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => window.open('https://wa.me/5549998362864', '_blank')}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
              >
                <Phone size={20} />
                Agendar Consulta
              </button>
              
              <button 
                onClick={() => window.open('https://www.instagram.com/dr.adrianocamillo/', '_blank')}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
              >
                <Instagram size={20} />
                Instagram
              </button>
            </div>
            
            {/* Contact Info */}
            <div className="pt-6 border-t border-blue-400 border-opacity-30">
              <p className="text-blue-200 text-sm">
                📞 (49) 9 9836-2864 | 📍 São Lourenço do Oeste • Realeza • Ampére
              </p>
            </div>
          </div>
          
          {/* Visual Element */}
          <div className="flex justify-center lg:justify-end animate-fade-in-right">
            <div className="relative">
              {/* Main Circle */}
              <div className="w-80 h-80 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center text-white text-8xl font-bold shadow-2xl animate-float">
                🦷
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl shadow-lg animate-bounce">
                ✨
              </div>
              
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-3xl shadow-lg animate-pulse">
                💉
              </div>
              
              <div className="absolute top-1/2 -left-8 w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-xl shadow-lg animate-ping">
                ⚡
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;