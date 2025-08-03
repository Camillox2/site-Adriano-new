import React from 'react';
import { Phone, Instagram } from 'lucide-react';
import { images } from '../assets';

const Hero = () => {
  return (
    <section id="inicio" className="min-h-screen bg-slate-800 flex items-center relative overflow-hidden">
      {/* Background Image with Overlay - Imagem mais visível */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 md:opacity-50"
        style={{ backgroundImage: `url(${images.consultorio1})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-800/60 to-slate-700/70"></div>
      
      {/* Partículas flutuantes decorativas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-emerald-400/60 rounded-full animate-particle-float"></div>
        <div className="absolute top-1/4 right-16 w-3 h-3 bg-blue-400/50 rounded-full animate-particle-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-emerald-300/60 rounded-full animate-particle-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-white/70 rounded-full animate-particle-float" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-blue-300/50 rounded-full animate-particle-float" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-32 left-1/3 w-1 h-1 bg-emerald-500/60 rounded-full animate-particle-float" style={{animationDelay: '0.5s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-20 lg:py-0">
          {/* Text Content - Responsivo */}
          <div className="text-white space-y-4 md:space-y-6 animate-fade-in-up text-center lg:text-left">
            {/* Badge profissional */}
            <div className="inline-flex items-center gap-2 bg-emerald-600/20 border border-emerald-400/30 px-4 py-2 rounded-full text-emerald-300 text-sm font-medium backdrop-blur-sm">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              Cirurgião-Dentista CRO-SC
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Transformando
              <span className="text-emerald-400">
                {" "}Sorrisos
              </span> e Autoestima
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Dr. Adriano Camillo - Especialista em Ortodontia, Implantes, Harmonização Orofacial e HIFU. 
              Atendimento em São Lourenço do Oeste, Realeza e Ampére.
            </p>
            
            {/* Specialties Pills - Responsivo */}
            <div className="flex flex-wrap gap-2 md:gap-3 justify-center lg:justify-start">
              <span className="bg-emerald-600/90 border border-emerald-400/30 text-white px-3 py-2 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium backdrop-blur-sm hover:bg-emerald-500/90 transition-colors">
                🦷 Ortodontia
              </span>
              <span className="bg-emerald-600/90 border border-emerald-400/30 text-white px-3 py-2 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium backdrop-blur-sm hover:bg-emerald-500/90 transition-colors">
                🔧 Implantes
              </span>
              <span className="bg-emerald-600/90 border border-emerald-400/30 text-white px-3 py-2 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium backdrop-blur-sm hover:bg-emerald-500/90 transition-colors">
                💉 Harmonização
              </span>
              <span className="bg-emerald-600/90 border border-emerald-400/30 text-white px-3 py-2 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium backdrop-blur-sm hover:bg-emerald-500/90 transition-colors">
                ⚡ HIFU
              </span>
            </div>
            
            {/* Call to Action Buttons - Responsivo */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 max-w-md mx-auto lg:mx-0">
              <button 
                onClick={() => window.open('https://wa.me/5549998362864', '_blank')}
                className="bg-emerald-600 border border-emerald-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold hover:bg-emerald-700 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg backdrop-blur-sm"
              >
                <Phone size={18} className="md:w-5 md:h-5" />
                Agendar Consulta
              </button>
              
              <button 
                onClick={() => window.open('https://www.instagram.com/dr.adrianocamillo/', '_blank')}
                className="border-2 border-white/80 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold hover:bg-white hover:text-slate-800 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <Instagram size={18} className="md:w-5 md:h-5" />
                Instagram
              </button>
            </div>
          </div>
          
          {/* Visual Element - Responsivo e mais atrativo */}
          <div className="flex justify-center animate-fade-in-right order-first lg:order-last">
            <div className="relative group">
              {/* Efeito de brilho ao redor */}
              <div className="absolute -inset-6 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500 animate-subtle-pulse blur-xl"></div>
              
              {/* Container da foto */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl ring-4 ring-white/20 hover:ring-emerald-400/50 transition-all duration-500 hover:scale-105 z-10">
                <img 
                  src={images.drAdriano} 
                  alt="Dr. Adriano Camillo" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                {/* Overlay sutil para destacar */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Badge flutuante */}
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-4 py-2 rounded-full shadow-lg animate-bounce-soft z-20">
                <div className="text-center">
                  <div className="text-lg font-bold">⚕️</div>
                  <div className="text-xs font-medium">CRO-SC</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;