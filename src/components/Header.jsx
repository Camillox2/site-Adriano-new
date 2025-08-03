import React, { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { images } from '../assets';

const Header = () => {
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 w-full z-40 transition-all duration-500 ${
      isHeaderScrolled ? 'bg-white/95 backdrop-blur-lg shadow-2xl py-2 border-b border-blue-100' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={images.logo} alt="Dr. Adriano Camillo Logo" className={`w-12 h-12 transition-all duration-500 ${
            isHeaderScrolled ? 'animate-pulse-soft' : 'animate-glow'
          }`} />
          <div>
            <h1 className={`text-xl font-bold transition-all duration-300 ${
              isHeaderScrolled ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600' : 'text-white animate-gradient-text'
            }`}>
              Dr. Adriano Camillo
            </h1>
            <p className={`text-sm transition-all duration-300 ${
              isHeaderScrolled ? 'text-gray-600' : 'text-slate-200'
            }`}>
              Cirurgião Dentista
            </p>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => scrollToSection('inicio')} 
            className={`hover:scale-110 hover:-translate-y-1 font-medium transition-all duration-300 ${
              isHeaderScrolled ? 'text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-emerald-600' : 'text-white hover:text-emerald-300'
            }`}
          >
            Início
          </button>
          <button 
            onClick={() => scrollToSection('servicos')} 
            className={`hover:scale-110 hover:-translate-y-1 font-medium transition-all duration-300 ${
              isHeaderScrolled ? 'text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-emerald-600' : 'text-white hover:text-emerald-300'
            }`}
          >
            Serviços
          </button>
          <button 
            onClick={() => scrollToSection('hifu')} 
            className={`hover:scale-110 hover:-translate-y-1 font-medium transition-all duration-300 ${
              isHeaderScrolled ? 'text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-emerald-600' : 'text-white hover:text-emerald-300'
            }`}
          >
            HIFU
          </button>
          <button 
            onClick={() => scrollToSection('sobre')} 
            className={`hover:scale-110 hover:-translate-y-1 font-medium transition-all duration-300 ${
              isHeaderScrolled ? 'text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-emerald-600' : 'text-white hover:text-emerald-300'
            }`}
          >
            Sobre
          </button>
          <button 
            onClick={() => scrollToSection('contato')} 
            className={`hover:scale-110 hover:-translate-y-1 font-medium transition-all duration-300 ${
              isHeaderScrolled ? 'text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-emerald-600' : 'text-white hover:text-emerald-300'
            }`}
          >
            Contato
          </button>
        </nav>
        
        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.open('https://wa.me/5549998362864', '_blank')}
            className="hidden sm:flex bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-2xl hover:scale-110 hover:-translate-y-2 transition-all duration-500 items-center gap-2 btn-magnetic group"
          >
            <Phone size={16} className="group-hover:animate-bounce" />
            <span className="group-hover:animate-pulse">Agendar Consulta</span>
          </button>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden ${isHeaderScrolled ? 'text-gray-800' : 'text-white'}`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg shadow-2xl border-t border-blue-100">
          <nav className="container mx-auto px-4 py-6 space-y-4">
            <button 
              onClick={() => scrollToSection('inicio')}
              className="block w-full text-left text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-emerald-600 hover:scale-105 hover:translate-x-2 transition-all duration-300 py-3 font-medium"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection('servicos')}
              className="block w-full text-left text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-emerald-600 hover:scale-105 hover:translate-x-2 transition-all duration-300 py-3 font-medium"
            >
              Serviços
            </button>
            <button 
              onClick={() => scrollToSection('hifu')}
              className="block w-full text-left text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-emerald-600 hover:scale-105 hover:translate-x-2 transition-all duration-300 py-3 font-medium"
            >
              HIFU
            </button>
            <button 
              onClick={() => scrollToSection('sobre')}
              className="block w-full text-left text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-emerald-600 hover:scale-105 hover:translate-x-2 transition-all duration-300 py-3 font-medium"
            >
              Sobre
            </button>
            <button 
              onClick={() => scrollToSection('contato')}
              className="block w-full text-left text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-emerald-600 hover:scale-105 hover:translate-x-2 transition-all duration-300 py-3 font-medium"
            >
              Contato
            </button>
            <button 
              onClick={() => window.open('https://wa.me/5549998362864', '_blank')}
              className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-4 rounded-full font-bold hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-all duration-500 flex items-center justify-center gap-3 btn-magnetic group mt-6"
            >
              <Phone size={18} className="group-hover:animate-bounce" />
              <span className="group-hover:animate-pulse">Agendar Consulta</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;